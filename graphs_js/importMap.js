
var map = new Datamap({
scope: 'world',
element: document.getElementById('importMap'),

geographyConfig: {
highlightBorderColor: 'black',
highlightFillColor: '#444444',
borderColor: 'black',
popupTemplate: function(geography, data) {
	if (data === null){ return '<div class="hoverinfo">' + geography.properties.name }
	else { return '<div class="hoverinfo">' +'Imported from '+ geography.properties.name + ': ' +  data.val + ' Billion £' }
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
  DEU: {fillKey: 'e1', 'val': 61.7 },
  CHN: {fillKey: 'n1', 'val': 36.9 },
  NLD: {fillKey: 'e2', 'val': 31.7 },
  USA: {fillKey: 'n2', 'val': 33.5 },
  FRA: {fillKey: 'e3', 'val': 24.4 },
  BEL: {fillKey: 'e4', 'val': 21.3 },
  NOR: {fillKey: 'e5', 'val': 13.1 },
  ITA: {fillKey: 'e6', 'val': 16.0 },
  ESP: {fillKey: 'e7', 'val': 14.0 },
  IRL: {fillKey: 'e8', 'val': 12.8 },
  SWE: {fillKey: 'e9', 'val': 6.9 },
  CHE: {fillKey: 'e9', 'val': 8.4 },
  POL: {fillKey: 'e9', 'val': 8.2 },
  IND: {fillKey: 'n3', 'val': 6.1 },
  JPN: {fillKey: 'n4', 'val': 6.8 },
  CAN: {fillKey: 'n5', 'val': 6.1 },
  TUR: {fillKey: 'n6', 'val': 1.7 },
  RUS: {fillKey: 'n7', 'val': 1.1 },
  CZE: {fillKey: 'e9', 'val': 1.2 },
  DNK: {fillKey: 'e9', 'val': 0.9 }    
}
})