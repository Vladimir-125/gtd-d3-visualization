function drawGraph(select_data,listOfColums) {
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
    function setupAxis(columns,data,width,height){
        let xData = [...new Set(data.map(x=>x[columns[0]]))]
        let xScale,yScale,yData
        console.log(xData)
        if(columns.length==2){
            yData = [...new Set(data.map(x=>x[columns[1]]))]
            console.log(yData)

            xScale = d3.scaleBand().domain(xData).range([0,width]).paddingOuter(0.1).paddingInner(0.1)
            yScale = d3.scaleBand().domain(yData).range([height,0]).paddingOuter(0.1).paddingInner(0.1)
        }else{
            let y = dataCounter(data.map(x=>x[columns[0]]))
            //console.log(y)
            let yMaxValue = y.max
            yData = y.obj

            xScale = d3.scaleBand().domain(xData).range([0,width]).paddingOuter(0.1).paddingInner(0.1)
            yScale = d3.scaleLinear().domain([0,yMaxValue]).range([height,0])

        }

        let xAxis = d3.axisBottom(xScale)
        let yAxis = d3.axisLeft(yScale)
        return {
            "xScale":xScale,
            "yScale":yScale,
            "xAxis":xAxis,
            "yAxis":yAxis,
            "xData":xData,
            "yData":yData,
        }
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
            "attacktype1_txt",
            "city",
            "country_txt",
            "gname",
            "motive",
            "provstate",
            "region_txt",
            "targsubtype1_txt",
            "targtype1_txt",
            "weapdetail",
            "weapsubtype1_txt",
            "summary",
            "weaptype1_txt"
        ]
        let intType = [
            "extended",
            "latitude",
            "longitude",
            "multiple",
            "nkill",
            "nwound",
            "ransom",
            "success",
            "suicide"
        ]
        let boolType =[
            "ishostkid"
        ]
        let idType = ["eventid","dbsource"]
        if(strType.includes(col)) return "str"
        else if(intType.includes(col)) return "int"
        else if(boolType.includes(col)) return "bool"
        else if(idType.includes(col)) return "id"

    }
    function translate(x,y){return `translate(${x}, ${y})`}

    const border = d3.select("div#sumGraphDiv")//.attr("position","relative")
    const svgHeight = 560
    const svgWidth = 1800
    const svgScreen = border.append("svg").attr("id","screen").attr("width",svgWidth).attr("height", svgHeight);
    const svgGraph = svgScreen.append("svg").attr("id","columnGraph").attr("width",svgWidth).attr("height", svgHeight)



    const selectedColumn = listOfColumns
    const selectedObjs = select_data

    const selection = dataSelector(selectedColumn,selectedObjs);
    const nCol = selectedColumn.length


    const graphArea = svgGraph.append("g").attr("id","graphArea").attr('transform', translate(40, 20))

    const graph_width = svgWidth-50
    const graph_height = svgHeight-50

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


    const axis = setupAxis(selectedColumn,selection,graph_width,graph_height)
    console.log(axis)
    d3.select("g#xArea").call(axis.xAxis)
    d3.select("g#yArea").call(axis.yAxis)



    let draw = d3.select("g#barArea")
    //console.log(draw)

    if(selectedColumn.length==1){
        //single column graph
        //create monoData
        let monoData = axis.xData.map(function(elem){
            return {"kind":elem,"count":axis.yData[elem]}
        })
        draw.selectAll("rect").data(monoData,x=>x.kind).enter().append("rect")
            //.attr("tranform",d=>translate(axis.xScale(d[selectedColumn[0]]),axis.yScale(axis.yData[d[selectedColumn[0]]])))
            .attr("x",d=>axis.xScale(d.kind))
            .attr("y",d=>axis.yScale(d.count))
            .attr('width',axis.xScale.bandwidth())
            .attr('height',d=>{return graph_height-axis.yScale(d.count)})
    }else if(selectedColumn.length==2){
        //check column type

        let col0Type=colType(selectedColumn[0])
        let col1Type=colType(selectedColumn[1])

        if(col0Type=="str"){
            if(col1Type=="int"){
                //str,int - bar
                //create monoData, just like one column
                let monoData = axis.xData.map(function(elem,i){
                    return {"kind":elem,"val":axis.yData[i]}
                })
                draw.selectAll("rect").data(monoData,x=>x.kind).enter().append("rect")
                    //.attr("tranform",d=>translate(axis.xScale(d[selectedColumn[0]]),axis.yScale(axis.yData[d[selectedColumn[0]]])))
                    .attr("x",d=>axis.xScale(d.kind))
                    .attr("y",d=>axis.yScale(d.val))
                    .attr('width',axis.xScale.bandwidth())
                    .attr('height',d=>{return graph_height-axis.yScale(d.count)})

            }else if(col1Type=="str"){
                //str,str - scatterpolt with size
                //setup count function for same xyvals

            }else{
                console.log("Not Supported columntypes")
            }
        }else if(col0Type=="int"){
            if(col1Type=="int"){
                //int,int - scatterpolt
                //just use selection

            }else{
                console.log("Not Supported for int + othertype")
            }
        }
    }
    d3.select('#columnSelect')
        .on('change', function() {
            const selectedColumn = getColumn(true)
            const selectedEvent = getEvent(true)
            const selection = dataSelector(selectedColumn, selectedEvent,origin);
            const nCol = selectedColumn.length
            const axis = setupAxis(selectedColumn,selection,graph_width,graph_height)
            d3.select("g#xArea").call(axis.xAxis)
            d3.select("g#yArea").call(axis.yAxis)

            let draw = d3.select("g#barArea")
            let monoData = axis.xData.map(function(elem){
                return {"kind":elem,"count":axis.yData[elem]}
            })
            draw.selectAll("rect").remove()
            draw.selectAll("rect").data(monoData,x=>x.kind).enter().append("rect")
                //.attr("tranform",d=>translate(axis.xScale(d[selectedColumn[0]]),axis.yScale(axis.yData[d[selectedColumn[0]]])))
                .attr("x",d=>axis.xScale(d.kind))
                .attr("y",d=>axis.yScale(d.count))
                .attr('width',axis.xScale.bandwidth())
                .attr('height',d=>{return graph_height-axis.yScale(d.count)})
        });

}






