function drawGraph(select_data,listOfColumns) {
    function dataCounter(xData, selector){
        let ret = {}
        let max = 0
        xData.forEach(function(elem){
            if(ret[elem]==undefined){
                ret[elem]=1
            }else{
                ret[elem]++;
            }
            if(ret[elem]>max)
                max=ret[elem]
        })
        return {"obj":ret,"max":max};
    }
    function dataSelector(cols,origin){
        return origin.map(function(x){
            let ret ={}
            ret["eventid"]=x["eventid"]
            cols.forEach(function(c){
                ret[c] = x[c]
            })
            return ret;
        })
    }
    function colType(col){
        let strType = [
            "attacktype1",
            "city",
            "country",
            "gname",
            "provstate",
            "region",
            "targsubtype1",
            "targtype1",
            "weapdetail",
            "weapsubtype1",
            "weaptype1"
        ]
        let textType =[
            "summary",
            "motive",
        ]
        let intType = [
            "nkill",
            "nwound",
        ]
        let boolType =[
            "extended",
            "ishostkid",
            "ransom",
            "success",
            "multiple",
            "suicide"
        ]
        let posType =[
            "latitude",
            "longitude",
        ]
        let dateType=[
            "year",
            "month",
            "day",
        ]
        let idType = ["eventid","dbsource"]
        if(strType.includes(col)) return "str"
        else if(intType.includes(col)) return "int"
        else if(boolType.includes(col)) return "bool"
        else if(idType.includes(col)) return "id"
        else if(dateType.includes(col)) return "date"
        else if(posType.includes(col)) return "pos"
        else return "non-graph"

    }

    //needtodo
    //fix str str
    //date int need fix
    //str bool
    //date bool
    //column number
    //color


    function translate(x,y){return `translate(${x}, ${y})`}


    //first need to remove remaining graph info
    d3.select("g#graphArea").selectAll("*").remove()
    d3.select("g#graphArea").remove()

    const border = d3.select("div#sumGraphDiv")//.attr("position","relative")
    const svgWidth = document.getElementById("sumGraphDiv").offsetWidth//1800
    //const svgHeight = document.getElementById("sumGraphDiv").offsetHeight
    const svgHeight = 500
    const svgScreen = d3.select("svg#screen").attr("width",svgWidth).attr("height", svgHeight);
    const svgGraph = svgScreen.select("svg#columnGraph").attr("width",svgWidth).attr("height", svgHeight)

    const selectedColumn = listOfColumns
    const selectedObjs = select_data
    const selection = dataSelector(selectedColumn,selectedObjs);


    const graphArea = svgGraph.append("g").attr("id","graphArea").attr('transform', translate(40, 20))

    const graph_width = svgWidth-50
    const graph_height = svgHeight-150

    graphArea.append('g')
        .attr('transform', translate(0, graph_height))
        .attr("id", "xArea")
    graphArea.append('g')
        //.attr('transform', translate(20,0))
        .attr("id", "yArea")
    graphArea.append('g')
        .attr("id", "barArea")
        .attr("width", graph_width)
        .attr("height", graph_height)

    let draw = d3.select("g#barArea")
    //console.log(draw)

    function setupAxisMono(columns,data,width,height,isCompact){
        let xData = [...new Set(data.map(x=>x[columns[0]]))]
        xData.sort()
        let xScale,yScale,yData
        let y = dataCounter(data.map(x=>x[columns[0]]))
        //console.log(y)
        let yMaxValue = y.max
        yData = y.obj

        let monoData = xData.map(function(elem){
            return {"kind":elem,"count":yData[elem]}
        })
        monoData.sort(function(a,b){
            return b.count-a.count;
        })
        let compressedMono =[]
        let others = {"kind":"Others","count":0}
        monoData.forEach(function(d,i,nodes){
            if(i<10){
                compressedMono.push(d)
            }else{
                others["count"]+=d.count
            }
        })
        let cScale = d3.scaleOrdinal(d3.schemeCategory10);
        compressedMono.push(others)
        // console.log(monoData)
        // console.log(compressedMono)
        if(monoData.length>10){
            monoData = compressedMono
            xScale = d3.scaleBand().domain(monoData.map(x=>x.kind)).range([0,width]).paddingOuter(0.1).paddingInner(0.1)
            yScale = d3.scaleLinear().domain([0,Math.max(...monoData.map(x=>x.count))]).range([height,0])
            let xAxis = d3.axisBottom(xScale)
            let yAxis = d3.axisLeft(yScale)
            return {
                "xScale":xScale,
                "yScale":yScale,
                "color":cScale,
                "xAxis":xAxis,
                "yAxis":yAxis,
                "monoData":monoData
            }
        }else{
            xScale = d3.scaleBand().domain(xData).range([0,width]).paddingOuter(0.1).paddingInner(0.1)
            yScale = d3.scaleLinear().domain([0,yMaxValue]).range([height,0])
            let xAxis = d3.axisBottom(xScale)
            let yAxis = d3.axisLeft(yScale)
            return {
                "xScale":xScale,
                "yScale":yScale,
                "color":cScale,
                "xAxis":xAxis,
                "yAxis":yAxis,
                "monoData":monoData
            }
        }
    }
    function setupAxisMulti(x_col,x_type,y_col,y_type,data,width,height,isCompact){
        let multiData = [];
        if(x_type=="str"){
            if(y_type=="int"){
                let xData = [...new Set(data.map(x=>x[x_col]))]
                let yMaxValue=0
                xData.sort()
                xData.forEach(function(x) {
                    let count=0
                    data.map(function (elem, d) {
                        if(x==elem[x_col]){
                            let v
                            if(elem[y_col]==""){
                                v = 0
                            }else{
                                v = parseInt(elem[y_col])
                            }
                            console.log(elem[y_col])

                            count=count+v
                        }
                    })
                    if(yMaxValue<count){
                        yMaxValue = count
                    }
                    multiData.push({"kind":x,"val":count})
                })
                // console.log(xData)
                // console.log(yMaxValue)

                let compressedData = []
                let others = {"kind":"Others","val":0}
                multiData.forEach(function(d,i,nodes){
                    if(i<10){
                        compressedData.push(d)
                    }else{
                        others["val"]+=d.val
                    }
                })

                let cScale = d3.scaleOrdinal(d3.schemeCategory10);
                if(multiData.length>10){
                    multiData = compressedData;
                    let xScale = d3.scaleBand().domain(multiData.map(d=>d.kind)).range([0,width]).paddingOuter(0.1).paddingInner(0.1)
                    let yScale = d3.scaleLinear().domain([0,Math.max(...multiData.map(d=>d.val))]).range([height,0])
                    let xAxis = d3.axisBottom(xScale)
                    let yAxis = d3.axisLeft(yScale)
                    return{
                        "xScale":xScale,
                        "yScale":yScale,
                        "color":cScale,
                        "xAxis":xAxis,
                        "yAxis":yAxis,
                        "multiData":multiData,
                    }
                }else{
                    let xScale = d3.scaleBand().domain(xData).range([0,width]).paddingOuter(0.1).paddingInner(0.1)
                    let yScale = d3.scaleLinear().domain([0,yMaxValue]).range([height,0])
                    let xAxis = d3.axisBottom(xScale)
                    let yAxis = d3.axisLeft(yScale)
                    return{
                        "xScale":xScale,
                        "yScale":yScale,
                        "color":cScale,
                        "xAxis":xAxis,
                        "yAxis":yAxis,
                        "multiData":multiData,
                    }
                }
            }
            else if(y_type=="str"){
                let xData = [...new Set(data.map(x=>x[x_col]))]
                let yData = [...new Set(data.map(x=>x[y_col]))]
                xData.sort()
                yData.sort()
                let multiData = []
                xData.forEach(function(x){
                    yData.forEach(function(y){
                        let count=0
                        data.map(function(elem,i){
                            if(elem[x_col]==x && elem[y_col]==y){
                                count++;
                            }
                        })
                        multiData.push({"x":x,"y":y,"count":count})
                    })
                })

                let xScale = d3.scaleBand().domain(xData).range([0,width])
                let yScale = d3.scaleLinear().domain(yData).range([height,0])
                let xAxis = d3.axisBottom(xScale)
                let yAxis = d3.axisLeft(yScale)
                let cScale = d3.scaleOrdinal(d3.schemeCategory10);
                return{
                    "xScale":xScale,
                    "color":cScale,
                    "yScale":yScale,
                    "xAxis":xAxis,
                    "yAxis":yAxis,
                    "multiData":multiData,
                }
            }
        }else if(x_type=="date"){
            if(y_type=="int"){
                let xData = [...new Set(data.map(x=>x[x_col]))]
                let yMaxValue=0
                xData.sort()
                xData.forEach(function(x) {
                    let count=0
                    data.map(function (elem, d) {
                        if(x==elem[x_col]){
                            let v
                            if(elem[y_col]==""){
                                v = 0
                            }else{
                                v = parseInt(elem[y_col])
                            }
                            console.log(elem[y_col])

                            count=count+v
                        }
                    })
                    if(yMaxValue<count){
                        yMaxValue = count
                    }
                    multiData.push({"kind":x,"val":count})
                })
                let compressedData = []
                let others = {"kind":"Others","val":0}
                multiData.forEach(function(d,i,nodes){
                    if(i<10){
                        compressedData.push(d)
                    }else{
                        others["val"]+=d.val
                    }
                })
                // console.log(xData)
                // console.log(yMaxValue)
                if(multiData.length>10){
                    multiData = compressedData;
                    let xScale = d3.scaleBand().domain(multiData.map(d=>d.kind)).range([0,width]).paddingOuter(0.1).paddingInner(0.1)
                    let yScale = d3.scaleLinear().domain([0,Math.max(...multiData.map(d=>d.val))]).range([height,0])
                    let xAxis = d3.axisBottom(xScale)
                    let yAxis = d3.axisLeft(yScale)
                    let cScale = d3.scaleOrdinal(d3.schemeCategory10);
                    return{
                        "xScale":xScale,
                        "yScale":yScale,
                        "color":cScale,
                        "xAxis":xAxis,
                        "yAxis":yAxis,
                        "multiData":multiData,
                    }
                }else{
                    let xScale = d3.scaleBand().domain(xData).range([0,width]).paddingOuter(0.1).paddingInner(0.1)
                    let yScale = d3.scaleLinear().domain([0,yMaxValue]).range([height,0])
                    let xAxis = d3.axisBottom(xScale)
                    let yAxis = d3.axisLeft(yScale)
                    let cScale = d3.scaleOrdinal(d3.schemeCategory10);
                    return{
                        "xScale":xScale,
                        "yScale":yScale,
                        "color":cScale,
                        "xAxis":xAxis,
                        "yAxis":yAxis,
                        "multiData":multiData,
                    }
                }
            }
        }
    }
    // console.log(selectedColumn)
    // console.log(selectedColumn.length)

    if(selectedColumn.length==1){
        //single column graph
        //create monoData
        // console.log("mono")
        const axis = setupAxisMono(selectedColumn,selection,graph_width,graph_height)
        d3.select("g#xArea").call(axis.xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .style("font-size","9px")
            .attr("transform", function(d) {
                return "rotate(-35)"
            });
        d3.select("g#yArea").call(axis.yAxis)

        // console.log(axis.monoData)
        draw.selectAll("rect").data(axis.monoData,x=>x.kind).enter().append("rect")
            .attr("x",d=>axis.xScale(d.kind))
            .attr("y",d=>axis.yScale(d.count))
            .attr('width',axis.xScale.bandwidth())
            .attr('height',d=>{return graph_height-axis.yScale(d.count)})
            .attr("fill",d=>axis.color(d.kind))
    }else if(selectedColumn.length==2){
        //check column type


        let col0Type=colType(selectedColumn[0])
        let col1Type=colType(selectedColumn[1])

        if(col0Type=="str"){
            if(col1Type=="int"){
                console.log("strint")
                //str,int - bar
                //create monoData, just like one column
                const axis = setupAxisMulti(selectedColumn[0],col0Type,selectedColumn[1],col1Type,selection,graph_width,graph_height)
                // console.log(axis)
                // console.log(graph_height)
                d3.select("g#xArea").call(axis.xAxis)
                    .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .style("font-size","9px")
                    .attr("transform", function(d) {
                        return "rotate(-35)"
                    });
                d3.select("g#yArea").call(axis.yAxis)

                draw.selectAll("rect").data(axis.multiData,x=>x.kind).enter().append("rect")
                    .attr("x",d=>axis.xScale(d.kind))
                    .attr("y",d=>axis.yScale(d.val))
                    .attr('width',axis.xScale.bandwidth())
                    .attr('height',d=>{return graph_height-axis.yScale(d.val)})
                    .attr("fill",d=>axis.color(d.kind))
            }
            else if(col1Type=="str"){
                // console.log("strstr")
                //str,str - scatterpolt with size
                //setup count function for same xyvals
            //     const axis = setupAxisMulti(selectedColumn[0],col0Type,selectedColumn[1],col1Type,selection,graph_width,graph_height)
            //     d3.select("g#xArea").call(axis.xAxis)
            //         .selectAll("text")
            //         .style("text-anchor", "end")
            //         .attr("dx", "-.8em")
            //         .attr("dy", ".15em")
            //         .style("font-size","9px")
            //         .attr("transform", function(d) {
            //             return "rotate(-35)"
            //         });
            //     d3.select("g#yArea").call(axis.yAxis)
            //     console.log(axis.multiData)
            //     draw.selectAll("circle").data(axis.multiData).enter().append("circle")
            //         .attr("cx",d=>axis.xScale(d.x))
            //         .attr("cy",d=>{return graph_height-axis.yScale(d.y)})
            //         .attr("r",d=>d.count)
            //         .attr("fill",d=>axis.color(d.x))
            // }
            //
            // else{
            //     d3.select("g#graphArea").selectAll("*").remove()
            //     d3.select("g#graphArea").remove()
            //     d3.select("g#graphArea").append("text").style("text-align","center").html("This type of relationship is not appropriate or supported")
            //     console.log("Not Supported column types")

                d3.select("g#graphArea").selectAll("*").remove()
                d3.select("g#graphArea").append("text").style("text-align","center").html("This type of relationship is not appropriate or supported")
            }
            else{
                d3.select("g#graphArea").selectAll("*").remove()
                d3.select("g#graphArea").append("text").style("text-align","center").html("This type of relationship is not appropriate or supported")
                console.log("Not Supported column types")
            }


        }
        else if(col0Type=="int"){
            if(col1Type=="str"){
                console.log("intstr")
                const axis = setupAxisMulti(selectedColumn[1],col1Type,selectedColumn[0],col0Type,selection,graph_width,graph_height)
                d3.select("g#xArea").call(axis.xAxis)
                    .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .style("font-size","9px")
                    .attr("transform", function(d) {
                        return "rotate(-35)"
                    });
                d3.select("g#yArea").call(axis.yAxis)
                draw.selectAll("rect").data(axis.multiData,x=>x.kind).enter().append("rect")
                    .attr("x",d=>axis.xScale(d.kind))
                    .attr("y",d=>axis.yScale(d.val))
                    .attr('width',axis.xScale.bandwidth())
                    .attr('height',d=>{return graph_height-axis.yScale(d.val)})
                    .attr("fill",d=>axis.color(d.kind))

            }
            else if(co1Type=="date"){
                console.log("intdate")
                const axis = setupAxisMulti(selectedColumn[1],col1Type,selectedColumn[0],col0Type,selection,graph_width,graph_height)
                d3.select("g#xArea").call(axis.xAxis)
                    .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .style("font-size","9px")
                    .attr("transform", function(d) {
                        return "rotate(-35)"
                    });
                d3.select("g#yArea").call(axis.yAxis)
                draw.selectAll("rect").data(axis.multiData,x=>x.kind).enter().append("rect")
                    .attr("x",d=>axis.xScale(d.kind))
                    .attr("y",d=>axis.yScale(d.val))
                    .attr('width',axis.xScale.bandwidth())
                    .attr('height',d=>{return graph_height-axis.yScale(d.val)})
                    .attr("fill",d=>axis.color(d.kind))
            }
            else{
                d3.select("g#graphArea").selectAll("*").remove()
                d3.select("g#graphArea").append("text").style("text-align","center").html("This type of relationship is not appropriate or supported")
                console.log("Not Supported column types")
            }
        }
        else if(col0Type=="date"){
            if(col1Type=="int"){
                console.log("dateint")
                //str,int - bar
                //create monoData, just like one column
                const axis = setupAxisMulti(selectedColumn[0],col0Type,selectedColumn[1],col1Type,selection,graph_width,graph_height)
                console.log(axis)
                console.log(graph_height)
                d3.select("g#xArea").call(axis.xAxis)
                    .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .style("font-size","9px")
                    .attr("transform", function(d) {
                        return "rotate(-35)"
                    });
                d3.select("g#yArea").call(axis.yAxis)

                draw.selectAll("rect").data(axis.multiData,x=>x.kind).enter().append("rect")
                    .attr("x",d=>axis.xScale(d.kind))
                    .attr("y",d=>axis.yScale(d.val))
                    .attr('width',axis.xScale.bandwidth())
                    .attr('height',d=>{return graph_height-axis.yScale(d.val)})
                    .attr("fill",d=>axis.color(d.kind))
            }
            else{
                d3.select("g#graphArea").selectAll("*").remove()
                d3.select("g#graphArea").append("text").style("text-align","center").html("This type of relationship is not appropriate or supported")
                console.log("Not Supported column types")
            }
        }else{
            d3.select("g#graphArea").selectAll("*").remove()
            d3.select("g#graphArea").append("text").style("text-align","center").html("This type of relationship is not appropriate or supported")
            console.log("Not Supported column types")
        }
    }else if(selectedColumn.length==0){
        d3.select("g#graphArea").selectAll("*").remove()
        d3.select("g#graphArea").append("text").style("text-align","center").html("This type of relationship is not appropriate or supported")
        console.log("No columns selected")
    }else{
        d3.select("g#graphArea").selectAll("*").remove()
        d3.select("g#graphArea").append("text").style("text-align","center").html("This type of relationship is not appropriate or supported")
        console.log("Not Supported column types")
    }
}
function clearGraph(){
    d3.select("g#graphArea").selectAll("*").remove()
    d3.select("g#graphArea").remove()
}





