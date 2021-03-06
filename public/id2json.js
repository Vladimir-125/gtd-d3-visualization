const id2attacktype1 = {
    '1': 'Assassination',
    '2': 'Armed Assault',
    '3': 'Bombing/Explosion',
    '4': 'Hijacking',
    '5': 'Hostage Taking (Barricade Incident)',
    '6': 'Hostage Taking (Kidnapping)',
    '7': 'Facility/Infrastructure Attack',
    '8': 'Unarmed Assault',
    '9': 'Unknown'
  }

const id2country = {
    '4': 'Afghanistan',
    '5': 'Albania',
    '6': 'Algeria',
    '7': 'Andorra',
    '8': 'Angola',
    '10': 'Antigua and Barbuda',
    '11': 'Argentina',
    '12': 'Armenia',
    '14': 'Australia',
    '15': 'Austria',
    '16': 'Azerbaijan',
    '17': 'Bahamas',
    '18': 'Bahrain',
    '19': 'Bangladesh',
    '20': 'Barbados',
    '21': 'Belgium',
    '22': 'Belize',
    '23': 'Benin',
    '25': 'Bhutan',
    '26': 'Bolivia',
    '28': 'Bosnia-Herzegovina', 
    '29': 'Botswana',
    '30': 'Brazil',
    '31': 'Brunei',
    '32': 'Bulgaria',
    '33': 'Burkina Faso',
    '34': 'Burundi',
    '35': 'Belarus',
    '36': 'Cambodia',
    '37': 'Cameroon',
    '38': 'Canada',
    '41': 'Central African Republic',
    '42': 'Chad',
    '43': 'Chile',
    '44': 'China',
    '45': 'Colombia',
    '46': 'Comoros',
    '47': 'Republic of the Congo',
    '49': 'Costa Rica',
    '50': 'Croatia',
    '51': 'Cuba',
    '53': 'Cyprus',
    '54': 'Czech Republic',
    '55': 'Denmark',
    '56': 'Djibouti',
    '57': 'Dominica',
    '58': 'Dominican Republic',
    '59': 'Ecuador',
    '60': 'Egypt',
    '61': 'El Salvador',
    '62': 'Equatorial Guinea',
    '63': 'Eritrea',
    '64': 'Estonia',
    '65': 'Ethiopia',
    '66': 'Falkland Islands',
    '67': 'Fiji',
    '68': 'Finland',
    '69': 'France',
    '70': 'French Guiana',
    '71': 'French Polynesia',
    '72': 'Gabon',
    '73': 'Gambia',
    '74': 'Georgia',
    '75': 'Germany',
    '76': 'Ghana',
    '78': 'Greece',
    '80': 'Grenada',
    '81': 'Guadeloupe',
    '83': 'Guatemala',
    '84': 'Guinea',
    '85': 'Guinea-Bissau',
    '86': 'Guyana',
    '87': 'Haiti',
    '88': 'Honduras',
    '89': 'Hong Kong',
    '90': 'Hungary',
    '91': 'Iceland',
    '92': 'India',
    '93': 'Indonesia',
    '94': 'Iran',
    '95': 'Iraq',
    '96': 'Ireland',
    '97': 'Israel',
    '98': 'Italy',
    '99': 'Ivory Coast',
    '100': 'Jamaica',
    '101': 'Japan',
    '102': 'Jordan',
    '103': 'Kazakhstan',
    '104': 'Kenya',
    '106': 'Kuwait',
    '107': 'Kyrgyzstan',
    '108': 'Laos',
    '109': 'Latvia',
    '110': 'Lebanon',
    '111': 'Lesotho',
    '112': 'Liberia',
    '113': 'Libya',
    '115': 'Lithuania',
    '116': 'Luxembourg',
    '117': 'Macau',
    '118': 'Macedonia',
    '119': 'Madagascar',
    '120': 'Malawi',
    '121': 'Malaysia',
    '122': 'Maldives',
    '123': 'Mali',
    '124': 'Malta',
    '127': 'Martinique',
    '128': 'Mauritania',
    '129': 'Mauritius',
    '130': 'Mexico',
    '132': 'Moldova',
    '136': 'Morocco',
    '137': 'Mozambique',
    '138': 'Myanmar',
    '139': 'Namibia',
    '141': 'Nepal',
    '142': 'Netherlands',
    '143': 'New Caledonia',
    '144': 'New Zealand',
    '145': 'Nicaragua',
    '146': 'Niger',
    '147': 'Nigeria',
    '149': 'North Korea',
    '151': 'Norway',
    '153': 'Pakistan',
    '155': 'West Bank and Gaza Strip',
    '156': 'Panama',
    '157': 'Papua New Guinea',
    '158': 'Paraguay',
    '159': 'Peru',
    '160': 'Philippines',
    '161': 'Poland',
    '162': 'Portugal',
    '164': 'Qatar',
    '166': 'Romania',
    '167': 'Russia',
    '168': 'Rwanda',
    '173': 'Saudi Arabia',
    '174': 'Senegal',
    '175': 'Serbia-Montenegro',
    '176': 'Seychelles',
    '177': 'Sierra Leone',
    '178': 'Singapore',
    '179': 'Slovak Republic',
    '180': 'Slovenia',
    '181': 'Solomon Islands',
    '182': 'Somalia',
    '183': 'South Africa',
    '184': 'South Korea',
    '185': 'Spain',
    '186': 'Sri Lanka',
    '189': 'St. Kitts and Nevis',
    '190': 'St. Lucia',
    '195': 'Sudan',
    '196': 'Suriname',
    '197': 'Swaziland',
    '198': 'Sweden',
    '199': 'Switzerland',
    '200': 'Syria',
    '201': 'Taiwan',
    '202': 'Tajikistan',
    '203': 'Tanzania',
    '204': 'Togo',
    '205': 'Thailand',
    '207': 'Trinidad and Tobago',
    '208': 'Tunisia',
    '209': 'Turkey',
    '210': 'Turkmenistan',
    '213': 'Uganda',
    '214': 'Ukraine',
    '215': 'United Arab Emirates',
    '217': 'United States',
    '218': 'Uruguay',
    '219': 'Uzbekistan',
    '220': 'Vanuatu',
    '221': 'Vatican City',
    '222': 'Venezuela',
    '223': 'Vietnam',
    '226': 'Wallis and Futuna',
    '228': 'Yemen',
    '229': 'Democratic Republic of the Congo',
    '230': 'Zambia',
    '231': 'Zimbabwe',
    '235': 'Yugoslavia',
    '236': 'Czechoslovakia',
    '347': 'East Timor',
    '349': 'Western Sahara',
    '359': 'Soviet Union',
    '362': 'West Germany (FRG)',
    '377': 'North Yemen',
    '403': 'Rhodesia',
    '406': 'South Yemen',
    '422': 'International',
    '428': 'South Vietnam',
    '499': 'East Germany (GDR)',
    '532': 'New Hebrides',
    '603': 'United Kingdom',
    '604': 'Zaire',
    '605': "People's Republic of the Congo",
    '1001': 'Serbia',
    '1002': 'Montenegro',
    '1003': 'Kosovo',
    '1004': 'South Sudan'
  }

  const id2region = {
    '1': 'North America',
    '2': 'Central America & Caribbean',
    '3': 'South America',
    '4': 'East Asia',
    '5': 'Southeast Asia',
    '6': 'South Asia',
    '7': 'Central Asia',
    '8': 'Western Europe',
    '9': 'Eastern Europe',
    '10': 'Middle East & North Africa',
    '11': 'Sub-Saharan Africa',
    '12': 'Australasia & Oceania'
  }
  
  const id2targsubtype1 = {
    '1': 'Gas/Oil/Electric',
    '2': 'Restaurant/Bar/Café',
    '3': 'Bank/Commerce',
    '4': 'Multinational Corporation',
    '5': 'Industrial/Textiles/Factory',
    '6': 'Medical/Pharmaceutical',
    '7': 'Retail/Grocery/Bakery',
    '8': 'Hotel/Resort',
    '9': 'Farm/Ranch',
    '10': 'Mining',
    '11': 'Entertainment/Cultural/Stadium/Casino',
    '12': 'Construction',
    '13': 'Private Security Company/Firm',
    '14': 'Judge/Attorney/Court',
    '15': 'Politician or Political Party Movement/Meeting/Rally',
    '16': 'Royalty',
    '17': 'Head of State',
    '18': 'Government Personnel (excluding police, military)',
    '19': 'Election-related',
    '20': 'Intelligence',
    '21': 'Government Building/Facility/Office',
    '22': 'Police Building (headquarters, station, school)',
    '23': 'Police Patrol (including vehicles and convoys)',
    '24': 'Police Checkpoint',
    '25': 'Police Security Forces/Officers',
    '26': 'Prison/Jail',
    '27': 'Military Barracks/Base/Headquarters/Checkpost',
    '28': 'Military Recruiting Station/Academy',
    '29': 'Military Unit/Patrol/Convoy',
    '30': 'Military Weaponry',
    '31': 'Military Aircraft',
    '32': 'Military Maritime',
    '33': 'Non-combatant Personnel',
    '34': 'Military Personnel (soldiers, troops, officers, forces)',
    '35': 'Military Transportation/Vehicle (excluding convoys)',
    '36': 'Military Checkpoint',
    '37': 'NATO',
    '39': 'Paramilitary',
    '40': 'Clinics',
    '41': 'Personnel',
    '42': 'Aircraft (not at an airport)',
    '43': 'Airline Officer/Personnel',
    '44': 'Airport',
    '45': 'Diplomatic Personnel (outside of embassy, consulate)',
    '46': 'Embassy/Consulate',
    '47': 'International Organization (peacekeeper, aid agency, compound)',
    '48': 'Teacher/Professor/Instructor',
    '49': 'School/University/Educational Building',
    '50': 'Other Personnel',
    '51': 'Food Supply',
    '52': 'Water Supply',
    '53': 'Newspaper Journalist/Staff/Facility',
    '54': 'Radio Journalist/Staff/Facility',
    '55': 'Television Journalist/Staff/Facility',
    '56': 'Other (including online news agencies)',
    '57': 'Civilian Maritime',
    '58': 'Commercial Maritime',
    '59': 'Oil Tanker',
    '60': 'Port',
    '61': 'Domestic NGO',
    '62': 'International NGO',
    '63': 'Ambulance',
    '64': 'Fire Fighter/Truck',
    '65': 'Refugee (including Camps/IDP/Asylum Seekers)',
    '66': 'Demilitarized Zone (including Green Zone)',
    '67': 'Unnamed Civilian/Unspecified',
    '68': 'Named Civilian',
    '69': 'Religion Identified',
    '70': 'Student',
    '71': 'Race/Ethnicity Identified',
    '72': 'Farmer',
    '73': 'Vehicles/Transportation',
    '74': 'Marketplace/Plaza/Square',
    '75': 'Village/City/Town/Suburb',
    '76': 'House/Apartment/Residence',
    '77': 'Laborer (General)/Occupation Identified',
    '78': 'Procession/Gathering (funeral, wedding, birthday, religious)',
    '79': 'Public Area (garden, parking lot, garage, beach, public building, camp)',
    '80': 'Memorial/Cemetery/Monument',
    '81': 'Museum/Cultural Center/Cultural House',
    '82': 'Labor Union Related',
    '83': 'Protester',
    '84': 'Political Party Member/Rally',
    '85': 'Religious Figure',
    '86': 'Place of Worship',
    '87': 'Affiliated Institution',
    '88': 'Radio',
    '89': 'Television',
    '90': 'Telephone/Telegraph',
    '91': 'Internet Infrastructure',
    '92': 'Multiple Telecommunication Targets',
    '93': 'Terrorist',
    '94': 'Non-State Militia',
    '95': 'Tourism Travel Agency',
    '96': 'Tour Bus/Van',
    '97': 'Tourist',
    '98': 'Other Facility',
    '99': 'Bus (excluding tourists)',
    '100': 'Train/Train Tracks/Trolley',
    '101': 'Bus Station/Stop',
    '102': 'Subway',
    '103': 'Bridge/Car Tunnel',
    '104': 'Highway/Road/Toll/Traffic Signal',
    '105': 'Taxi/Rickshaw',
    '106': 'Gas',
    '107': 'Electricity',
    '108': 'Oil',
    '109': 'Party Official/Candidate/Other Personnel',
    '110': 'Party Office/Facility',
    '111': 'Rally',
    '112': 'Legal Services',
    '113': 'Alleged Informant'
  }

  const id2targtype1 = {
    '1': 'Business',
    '2': 'Government (General)',
    '3': 'Police',
    '4': 'Military',
    '5': 'Abortion Related',
    '6': 'Airports & Aircraft',
    '7': 'Government (Diplomatic)',
    '8': 'Educational Institution',
    '9': 'Food or Water Supply',
    '10': 'Journalists & Media',
    '11': 'Maritime',
    '12': 'NGO',
    '13': 'Other',
    '14': 'Private Citizens & Property',
    '15': 'Religious Figures/Institutions',
    '16': 'Telecommunication',
    '17': 'Terrorists/Non-State Militia',
    '18': 'Tourists',
    '19': 'Transportation',
    '20': 'Unknown',
    '21': 'Utilities',
    '22': 'Violent Political Party'
  }

  const id2weapsubtype1 = {
    '1': 'Poisoning',
    '2': 'Automatic or Semi-Automatic Rifle',
    '3': 'Handgun',
    '4': 'Rifle/Shotgun (non-automatic)',
    '5': 'Unknown Gun Type',
    '6': 'Other Gun Type',
    '7': 'Grenade',
    '8': 'Landmine',
    '9': 'Letter Bomb',
    '10': 'Pressure Trigger',
    '11': 'Projectile (rockets, mortars, RPGs, etc.)',
    '12': 'Remote Trigger',
    '13': 'Suicide (carried bodily by human being)',
    '14': 'Time Fuse',
    '15': 'Vehicle',
    '16': 'Unknown Explosive Type',
    '17': 'Other Explosive Type',
    '18': 'Arson/Fire',
    '19': 'Molotov Cocktail/Petrol Bomb',
    '20': 'Gasoline or Alcohol',
    '21': 'Blunt Object',
    '22': 'Hands, Feet, Fists',
    '23': 'Knife or Other Sharp Object',
    '24': 'Rope or Other Strangling Device',
    '26': 'Suffocation',
    '27': 'Unknown Weapon Type',
    '28': 'Dynamite/TNT',
    '29': 'Sticky Bomb',
    '30': 'Explosive',
    '31': 'Pipe Bomb'
  }

  const id2weaptype1 = {
    '1': 'Biological',
    '2': 'Chemical',
    '3': 'Radiological',
    '5': 'Firearms',
    '6': 'Explosives',
    '7': 'Fake Weapons',
    '8': 'Incendiary',
    '9': 'Melee',
    '10': 'Vehicle (not to include vehicle-borne explosives, i.e., car or truck bombs)',
    '11': 'Sabotage Equipment',
    '12': 'Other',
    '13': 'Unknown'
  }