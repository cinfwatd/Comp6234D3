
var map = new Datamap({
scope: 'world',
element: document.getElementById('exportMap'),

geographyConfig: {
highlightBorderColor: 'black',
highlightFillColor: '#444444',
borderColor: 'black',
popupTemplate: function(geography, data) {
	if (data === null){ return '<div class="hoverinfo">' + geography.properties.name }
	else { return '<div class="hoverinfo">' +'Exported to '+ geography.properties.name + ': ' +  data.val + ' Billion ' }
},
  highlightBorderWidth: 1
},

projection: 'mercator',
height: 600,
fills: {
  
  defaultFill: '#eeeeee',
  
  e1: '#272EA0',
  e2: '#2E37A3',
  e3: '#3540A6',
  e4: '#3C49A9',
  e5: '#4352AC',
  e6: '#4B5CAF',
  e7: '#5265B2',
  e8: '#596EB5',
  e9: '#6077B8',
  e10: '#6780BB',
  
  n1: '#AE0A12',
  n2: '#B21D24',
  n3: '#B73037',
  n4: '#BB4349',
  n5: '#C0565C',
  n6: '#C46A6E',
  n7: '#C97D81',
  n8: '#CD9093',
  n9: '#D2A3A6',
  n10: '#D2A3A6',
  
},

<!-- Import Data -->

data: {
  USA: {fillKey: 'n1', 'val': 47.2 },
  DEU: {fillKey: 'e1', 'val': 30.6 },
  FRA: {fillKey: 'e2', 'val': 18.0 },
  NLD: {fillKey: 'e3', 'val': 17.0 },
  IRL: {fillKey: 'e4', 'val': 16.7 },
  CHN: {fillKey: 'n2', 'val': 13.0 },
  BEL: {fillKey: 'e5', 'val': 11.8 },
  CHE: {fillKey: 'e6', 'val': 9.9 },
  ESP: {fillKey: 'e7', 'val': 8.9 },
  ITA: {fillKey: 'e8', 'val': 8.5 },
  ARE: {fillKey: 'n3', 'val': 6.2 },
  KOR: {fillKey: 'n4', 'val': 4.9 },
  SAU: {fillKey: 'n5', 'val': 4.6 },
  JPN: {fillKey: 'n6', 'val': 4.5 },
  SWE: {fillKey: 'e9', 'val': 4.4 },
  IND: {fillKey: 'n7', 'val': 4.1 },
  CAN: {fillKey: 'n8', 'val': 4.0 },
  AUS: {fillKey: 'n9', 'val': 3.9 },
  SGP: {fillKey: 'n10', 'val': 3.9 },
  POL: {fillKey: 'e10', 'val': 3.6 },
  TUR: {fillKey: 'n9', 'val': 3.5 },
  NOR: {fillKey: 'e10', 'val': 3.2 },
  RUS: {fillKey: 'n10', 'val': 2.8},
  DNK: {fillKey: 'e10', 'val': 2.3 },
  ZAF: {fillKey: 'n10', 'val': 2.3 },
  BRA: {fillKey: 'n10', 'val': 2.2 }  
}
})