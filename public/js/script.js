var gaccProps = {
  nrcc: {
    irwinGacc: 'NRCC',
    egpGacc: 'USMTNRC',
    egpLocal: 'Northern%20Rockies'
  },
  akcc: {
    irwinGacc: 'AKCC',
    egpGacc: 'USAKACC',
    egpLocal: 'Alaska'
  },
  gbcc: {
    irwinGacc: 'GBCC',
    egpGacc: 'USUTGBC',
    egpLocal: 'Great%20Basin'
  },
  rmcc: {
    irwinGacc: 'RMCC',
    egpGacc: 'USCORMC',
    egpLocal: 'Rocky%20Mountain'
  },
  oscc: {
    irwinGacc: 'OSCC',
    egpGacc: 'USCAOSCC',
    egpLocal: 'South%20Ops'
  },
  oncc: {
    irwinGacc: 'ONCC',
    egpGacc: 'USCAONCC',
    egpLocal: 'North%20Ops'
  },
  swcc: {
    irwinGacc: 'SWCC',
    egpGacc: 'USNMSWC',
    egpLocal: 'Southwest'
  },
  sacc: {
    irwinGacc: 'SACC',
    egpGacc: 'USGASAC',
    egpLocal: 'Southern'
  }, 
  eacc: {
    irwinGacc: 'EACC',
    egpGacc: 'USWIEACC',
    egpLocal: 'Eastern'
  }, 
  nwcc: {
    irwinGacc: 'NWCC',
    egpGacc: 'USORNWC',
    egpLocal: 'Northwest'
  },                    
};
var gaccmap = (function(gaccProps) {
  var { irwinGacc, egpGacc, egpLocal } = gaccProps;
var app;
function ajax(options) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.open(options.method, options.url)
    xhr.responseType = ''
    xhr.onload = function() {
      if (this.status <= 200 && this.status < 300) { resolve(xhr.response) } 
      else { reject({ status: this.status, statusText: xhr.statusText }) }
    }
    xhr.onerror = function() {
      reject({ status: this.status, statusText: xhr.statusText })
    }
    if (options.headers) {
      Object.keys(options.headers).forEach(function(key) {
        xhr.setRequestHeader(key, options.headers[key])
      })
    }
    var params = options.params
    if (params && typeof params === 'object') {
      params = Object.keys(params).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
      }).join('&')
    }
    xhr.send(params)
  })
}

function tokenProps() {
  return {
    method: '',
    url:'',
    f:'',
    username:'',
    password: '',
    client: '',
    expiration: '',
    contentType: '',
  }
} 

function arcToken(tokenProps) {
  const { method, url, f, username, password, client, expiration, contentType } = tokenProps
  return ajax({
    method,
    url,
    params: {
      f,
      username,
      password,
      client,
      expiration
    },
    headers: { 'Content-Type': contentType } 
  }).then(res => {
    return JSON.parse(res).token
  }).catch(e => console.log(e))  
}

function queryProps() {
  return {
    url:'',
    service:'',
    server:'',
    layer:'',
    where:'',
    text:'',
    objectIds:'',
    time:'',
    geometry:'',
    geometryType:'',
    inSR:'',
    spatialRel:'',
    relationParam:'',
    outFields:'',
    returnGeometry:'',
    returnTrueCurves:'',
    maxAllowableOffset:'',
    geometryPrecision:'',
    outSR:'',
    returnIdsOnly:'',
    returnCountOnly:'',
    orderByFields:'',
    groupByFieldsForStatistics:'',
    outStatistics:'',
    returnZ:'',
    returnM:'',
    gdbVersion:'',
    returnDistinctValues:'',
    resultOffset:'',
    resultRecordCount:'',
    f:'',
    token:''
  }
}

function arcQuery(queryProps) {
  const q = queryProps
  const url =
    `${q.url}
    /${q.service}
    /${q.server}
    /${q.layer}
    /query?where=${q.where}
    &text=${q.text}
    &objectIds=${q.objectIds}
    &time=${q.time}
    &geometry=${q.geometry}
    &geometryType=${q.geometryType}
    &inSR=${q.inSR}
    &spatialRel=${q.spatialRel}
    &relationParam=${q.relationParam}
    &outFields=${q.outFields}
    &returnGeometry=${q.returnGeometry}
    &returnTrueCurves=${q.returnTrueCurves}
    &maxAllowableOffset=${q.maxAllowableOffset}
    &geometryPrecision=${q.geometryPrecision}
    &outSR=${q.outSR}
    &returnIdsOnly=${q.returnIdsOnly}
    &returnCountOnly=${q.returnCountOnly}
    &orderByFields=${q.orderByFields}
    &groupByFieldsForStatistics=${q.groupByFieldsForStatistics}
    &outStatistics=${q.outStatistics}
    &returnZ=${q.returnZ}
    &returnM=${q.returnM}
    &gdbVersion=${q.gdbVersion}
    &returnDistinctValues=${q.returnDistinctValues}
    &resultOffset=${q.resultOffset}
    &resultRecordCount=${q.resultRecordCount}
    &f=${q.f}
    &token=${q.token}`.replace(/\s/gm,"");
    // console.log(url)
    return ajax({ method: 'GET', url })
} 

require([
  'esri/config',
  'esri/request',   
  'esri/views/MapView',
  'esri/views/SceneView',
  'esri/Viewpoint',
  'esri/Map',
  'esri/Basemap',
  'esri/layers/TileLayer',
  'esri/layers/WebTileLayer',
  'esri/layers/FeatureLayer',
  'esri/geometry/Point',
  'esri/geometry/Polygon',
  'esri/renderers/SimpleRenderer',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/symbols/SimpleLineSymbol',
  'esri/symbols/PointSymbol3D',
  'esri/symbols/IconSymbol3DLayer',
  'esri/symbols/ObjectSymbol3DLayer',
  'esri/symbols/TextSymbol3DLayer',
  'esri/symbols/LabelSymbol3D',
  'esri/layers/support/LabelClass',
  'dojo/_base/array',
  'esri/core/watchUtils',
  'esri/layers/support/Field',            
  'esri/widgets/BasemapToggle',
  'esri/widgets/ScaleBar',
  'esri/widgets/Legend',
  'esri/widgets/LayerList',    
  "esri/widgets/Search",
  "dojo/query",
  // Bootstrap
  "bootstrap/Collapse", 
  "bootstrap/Dropdown",
  "bootstrap/Tab",
  
  // Calcite-maps
  "calcite-maps/calcitemaps-v0.4",
  "dojo/domReady!"
],
function(
  esriConfig,
  esriRequest,
  MapView,    
  SceneView,
  Viewpoint,
  Map,
  Basemap, 
  TileLayer,
  WebTileLayer,
  FeatureLayer, 
  Point,
  Polygon, 
  SimpleRenderer,
  SimpleMarkerSymbol,
  SimpleLineSymbol,
  PointSymbol3D,
  IconSymbol3DLayer,
  ObjectSymbol3DLayer, 
  TextSymbol3DLayer,
  LabelSymbol3D,
  LabelClass,
  arrayUtils,
  watchUtils,
  Field,
  BasemapToggle,
  ScaleBar,
  Legend,
  LayerList,    
  Search,
  query) {

esriConfig.request.corsEnabledServers.push(
  'irwin.doi.gov',
  'egp.nwcg.gov',
  'www.gbcc.us',
  'a.tile.stamen.com',
  'b.tile.stamen.com',
  'c.tile.stamen.com',
  'd.tile.stamen.com',
  'stamen-tiles-a.a.ssl.fastly.net',
  'stamen-tiles-b.a.ssl.fastly.net',
  'stamen-tiles-c.a.ssl.fastly.net',
  'stamen-tiles-d.a.ssl.fastly.net'
)

var gaccFields = [
  { name: 'ObjectID', alias: 'ObjectID', type: 'oid' },
  { name: 'title', alias: 'title', type: 'string' },
  { name: 'type', alias: 'type', type: 'string' }
] 

var gaccStyle = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    width: 2,
    color: [64,255,0]
  })
})


var gaccProps = function(gacc, token) {
  return {
    url:'https://egp.nwcg.gov/arcgis/rest/services/FireCOP',
    service:'USFSFireCOP_AgencyBoundaries',
    server:'MapServer',
    layer:'2',
    where:"(Unit_ID = '" + gacc + "')",
    text:'',
    objectIds:'',
    time:'',
    geometry:'true',
    geometryType:'',
    inSR:'',
    spatialRel:'esriSpatialRelIntersects',
    relationParam:'',
    outFields:'*',
    returnGeometry:'true',
    returnTrueCurves:'',
    maxAllowableOffset:'',
    geometryPrecision:'',
    outSR:'102100',
    returnIdsOnly:'',
    returnCountOnly:'',
    orderByFields:'OBJECTID%20ASC',
    groupByFieldsForStatistics:'',
    outStatistics:'',
    returnZ:'',
    returnM:'',
    gdbVersion:'',
    returnDistinctValues:'',
    resultOffset:'0',
    resultRecordCount:'50',
    f:'json',
    token
  }
}

var localProps = function(gacc, token) {
  return {
    url:'https://egp.nwcg.gov/arcgis/rest/services/FireCOP',
    service:'USFSFireCOP_AgencyBoundaries',
    server:'MapServer',
    layer:'1',
    where:"(Gacc = '" + gacc + "')",
    text:'',
    objectIds:'',
    time:'',
    geometry:'',
    geometryType:'esriGeometryEnvelope',
    inSR:'',
    spatialRel:'esriSpatialRelIntersects',
    relationParam:'',
    outFields:'*',
    returnGeometry:'true',
    returnTrueCurves:'',
    maxAllowableOffset:'',
    geometryPrecision:'',
    outSR:'102100',
    returnIdsOnly:'',
    returnCountOnly:'',
    orderByFields:'OBJECTID%20ASC',
    groupByFieldsForStatistics:'',
    outStatistics:'',
    returnZ:'',
    returnM:'',
    gdbVersion:'',
    returnDistinctValues:'',
    resultOffset:'0',
    resultRecordCount:'',
    f:'json',
    token
  }
}

var gaccPerimeter = function(gacc) {
  return "https://egp.nwcg.gov/arcgis/rest/services/FireCOP/USFSFireCOP_AgencyBoundaries/MapServer/2/"
    + "query?f=json&where=(Unit_ID = '" + gacc + "')&returnGeometry=true"
    + "&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=OBJECTID ASC&outSR=102100"
    + "&resultOffset=0&resultRecordCount=50&token=" 
}
var dispatchBoundaries = function(gacc) {
  return "https://egp.nwcg.gov/arcgis/rest/services/FireCOP/USFSFireCOP_AgencyBoundaries/MapServer/1/"
    + "query?f=json&where=(Gacc = '" + gacc + "')&returnGeometry=true"
    + "&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=OBJECTID"
    + " ASC&outSR=102100&resultOffset=0&resultRecordCount=50&token="
}

var egpEndpoints = function(gacc1, gacc2) {
  return  [ 
    gaccPerimeter(gacc1),
    dispatchBoundaries(gacc2),
  ]
}


arcToken({
  method: 'POST',
  url: 'https://egp.nwcg.gov/arcgis/tokens/',
  f: 'json',
  username: 'kara.stringer',
  password: 'MyMi55ymoMa!',
  client: 'requestip',
  expiration: '1440',
  contentType: 'application/x-www-form-urlencoded',
})
.then(token => {
  // var tokenized = egpEndpoints(egpGacc, egpLocal).map(function(curr) {
  //   return curr + token
  // });

  return [ 
    gaccProps(egpGacc, token),
    localProps(egpLocal, token)
  ].map((props, i) => {
    arcQuery(props)
    .then(res => {
      var item = JSON.parse(res)
      var lyr = new FeatureLayer({
        id: i,
        source: item.features.map(curr => {
          return {
            geometry: new Polygon({
              rings: curr.geometry.rings,
              spatialReference: { wkid:102100, latestWkid: 3857 },
            }),
            attributes: curr.attributes,
          }
        }),
        fields: item.fields,
        objectIdField: i.toString(), 
        renderer: gaccStyle,
        spatialReference: item.spatialReference,
        geometryType: item.geometryType,
      })
      map.add(lyr)
      // mapScene.add(lyr)
      if (lyr.id === 0) {
        lyr.ObjectIdField = item.features[0].attributes.Unit_ID
      }                     
    }).catch(err => console.log(err))    
  });

  // return tokenized.map((url, i) => {
  //   ajax({ method: 'GET', url })
  //   .then(res => {
  //     var item = JSON.parse(res)
  //     var lyr = new FeatureLayer({
  //       id: i,
  //       source: item.features.map(curr => {
  //         return {
  //           geometry: new Polygon({
  //             rings: curr.geometry.rings,
  //             spatialReference: { wkid:102100, latestWkid: 3857 },
  //           }),
  //           attributes: curr.attributes,
  //         }
  //       }),
  //       fields: item.fields,
  //       objectIdField: i.toString(), 
  //       renderer: gaccStyle,
  //       spatialReference: item.spatialReference,
  //       geometryType: item.geometryType,
  //     })
  //     map.add(lyr)
  //     // mapScene.add(lyr)
  //     if (lyr.id === 0) {
  //       lyr.ObjectIdField = item.features[0].attributes.Unit_ID
  //     }                     
  //   }).catch(err => console.log(err))
  // })
}).catch(err => console.log(err))

function style(color) {
  return new SimpleRenderer({
    symbol: new SimpleMarkerSymbol({
      style: 'circle',
      color: color[0],
      outline: { width: 2, color: color[1], style: 'solid' }
    }),
    visualVariables: [
      { type: 'size', field: 'Size' },
      { type: 'opacity', field: 'Opacity', stops: [{ value: 0, opacity: 0 }, { value: 1, opacity: .7 }] }
    ]
  })
}

var highlightStyle = function(color, hoverSize) {
  // return symbol: new SimpleMarkerSymbol({
  //   style: 'circle',
  //   color: [252,252,252,0],
  //   size: hoverSize,
  //   outline: { width: 2, color: color[1], style: 'solid' }
  // })
  // return new SimpleRenderer({
  //   symbol: new SimpleMarkerSymbol({
  //     style: 'circle',
  //     color: color[0],
  //     outline: { width: 2, color: color[1], style: 'solid' }
  //   }),
  //   visualVariables: [
  //     { type: 'size', field: 'HoverSize' },
  //   ]
  // })
}

var colors = [
  [[232,14,14,.6], [232,14,14]],
  [[254,253,6,.6], [254,253,6]],
  [[253,2,125,.6], [253,2,125]],
]

var styles = colors.map(function(curr) { return style(curr) })

var opacity = function(acres){ 
  var fade = (acres < 1000) ? .1*Math.ceil(10*(1-.0004*Math.ceil(acres/100)*100)) : (1 - .1*Math.floor(10*(.00012*Math.ceil(acres/100)*100+.4)));
  return fade;  
}         

function pTemplate() {
  return {
    title: '{IncidentName}',
    content: [{
      type: 'fields',
      fieldInfos: [{
        fieldName: 'UniqueFireIdentifier',
        label: 'Incident ID',
        visible: true
      }, {
        fieldName: 'IncidentName',
        label: 'Incident Name',
        visible: true
      }, {
        fieldName: 'FireDiscoveryDateTime',
        label: 'Fire Discovery Date/Time',
        visible: true,
        dateFormat: 'short-date-short-time'         
      }, {
        fieldName: 'Size',
        label: 'Acreage',
        visible: true
      }, {
        fieldName: 'InitialFireStrategy',
        label: 'Strategy',
        visible: true
      }, {
        fieldName: 'DispatchCenterID',
        label: 'Dispatch Center ID',
        visible: true,
      }, {
        fieldName: 'FireCause',
        label: 'Fire Cause',
        visible: true
      }, {
        fieldName: 'PrimaryFuelModel',
        label: 'Fuel Type',
        visible: true
      }, {
        fieldName: 'IncidentCommanderName',
        label: 'Incident Commander',
        visible: true
      }, {
        fieldName: 'POOLatitude',
        label: 'Latitude',
        visible: true,
        dateFormat: {
          digitSeparator: true,
          places: 3,
        },               
      }, {
        fieldName: 'POOLongitude',
        label: 'Longitude',
        visible: true,
        dateFormat: {
          digitSeparator: true,
          places: 3
        },            
      }, {          
        fieldName: 'POOProtectingAgency',
        label: 'Agency',
        visible: true
      }, {
        fieldName: 'PercentContained',
        label: 'Percent Contained',
        visible: true
      }]
    }],
  }
}

var nfires = function(gacc) {
  return "https://irwin.doi.gov/arcgis/rest/services/Irwin/FeatureServer/0/query?f=json"
    +"&where=(IsValid = 'true') AND (GACC = '" + gacc + "') AND (RecordSource = 'wildcad') AND (CreatedOnDateTime >= " + (Date.now() - 1.25*86400000) + ") AND (IncidentTypeCategory <> 'RX') AND (IncidentTypeCategory <> 'FA')"
    +"&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&outSR=102100&token="       
}
var ofires = function(gacc) {
  return "https://irwin.doi.gov/arcgis/rest/services/Irwin/FeatureServer/0/query?f=json"
    +"&where=(IsValid = 'true') AND (GACC = '" + gacc + "') AND (RecordSource = 'wildcad') AND (IncidentTypeCategory <> 'RX') AND (FireOutDateTime IS NULL) AND (FinalAcres IS NULL)  AND (IncidentTypeCategory <> 'FA')"
    +" AND (CreatedOnDateTime > " + (Date.now() - 10*86400000) + ") AND (CreatedOnDateTime < " + (Date.now() - 1.25*86400000) + ") AND (ModifiedOnDateTime > " + (Date.now() - 5*86400000) + ")"
    +"&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&outSR=102100&token="
}
var rxfires = function(gacc) {
  return "https://irwin.doi.gov/arcgis/rest/services/Irwin/FeatureServer/0/query?f=json"
    + "&where=(IsValid = 'true') AND (GACC = '" + gacc + "') AND (RecordSource = 'wildcad')" 
    + " AND (CreatedOnDateTime >= " + (Date.now() - 10*86400000) + ") AND (CreatedOnDateTime < " + (Date.now() + 86400000) + ")" 
    + " AND (FinalAcres IS NULL) AND (IncidentTypeCategory = 'RX') AND (IncidentTypeCategory <> 'FA')"
    + " AND (ModifiedOnDateTime > " + (Date.now() - 5*86400000) + ")"
    + "&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&outSR=102100&token="
}

var irwinEndpoints = function(gacc) {
  return [ nfires(gacc), ofires(gacc), rxfires(gacc) ]
}
var irwinObject = {
  0: 'New Fires',
  1: 'Ongoing Fires',
  2: 'Prescribed Fires',
  3: 'Team Fires: Type 1 or Type 2'
}
var irwinLayers = {
  0: 'nfires',
  1: 'ofires',
  2: 'rxfires',
}

ajax({
  method: 'POST',
  url: 'https://irwin.doi.gov/arcgis/tokens/generateToken',
  params: {
    f: 'json',
    username: 'gbccfiredata',
    password: 'KFyHQ2RAdxWa',
    client: 'requestip',
    expiration: 1440,
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
.then(res => {
  var tokenized = irwinEndpoints(irwinGacc).map(function(curr) {
    return curr + JSON.parse(res).token
  })
  return tokenized.map((url, i) => {
    ajax({ method: 'GET', url })
    .then(res => {
      var newFields = [
        new Field({
          name: 'Opacity',
          alias: 'Opacity',
          type: 'esriFieldTypeDouble'
        }),
        new Field({
          name: 'Size',
          alias: 'Size',
          type: 'esriFieldTypeDouble'
        }),
        new Field({
          name: 'HoverSize',
          alias: 'HoverSize',
          type: 'esriFieldTypeDouble'
        })              
      ] 

      var fires = JSON.parse(res)
      var lyr = new FeatureLayer({
        id: irwinLayers[i],
        title: irwinObject[i],
        source: fires.features.map(function(curr) {
          curr.attributes.DailyAcres = !curr.attributes.DailyAcres 
            ? curr.attributes.DiscoveryAcres
            : curr.attributes.DailyAcres
          curr.attributes.Size = (curr.attributes.DailyAcres <= 18.5) ? 7 : 2.4 * Math.log(curr.attributes.DailyAcres) 
          curr.attributes.FireDiscoveryDateTime = new Date(parseInt(curr.attributes.FireDiscoveryDateTime)).toLocaleString()
          var O = opacity(curr.attributes.DailyAcres)
          curr.attributes.Opacity = O < 0 ? 0 : O 
          curr.attributes.HoverSize = Math.log(curr.attributes.DailyAcres * 10000)
          return {
            geometry: new Point({
              x: curr.geometry.x,
              y: curr.geometry.y,
              spatialReference: { wkid: 3857 },
            }),
            attributes: curr.attributes,
          }
        }),
        fields: fires.fields,
        objectIdField: fires.objectIdFieldName,
        renderer: styles[i],
        spatialReference: fires.spatialReference,
        geometryType: fires.geometryType,
        // elevationInfo: { mode: 'on-the-ground' },
        popupTemplate: new pTemplate(),
      })
      lyr.then(res => lyr.fields.push(...newFields))
      map.add(lyr)
      // mapScene.add(lyr)          
    }).catch(err => console.log(err))
  })
}).catch(err => console.log(err))
    
var root = (location.protocol === 'https:') 
  ? 'https://stamen-tiles-{subDomain}.a.ssl.fastly.net/' 
  : 'http://{subDomain}.tile.stamen.com/'

var mapBaseLayer = new WebTileLayer({
  urlTemplate: root + 'terrain/{level}/{col}/{row}.png',
  subDomains: ['a', 'b', 'c', 'd'],
  copyright: "Map tiles by <a href=\"http://stamen.com/\">Stamen Design</a>, " +
    "under <a href=\"http://creativecommons.org/licenses/by/3.0\">CC BY 3.0</a>. " +
    "Data by <a href=\"http://openstreetmap.org/\">OpenStreetMap</a>, " +
    "under <a href=\"http://creativecommons.org/licenses/by-sa/3.0\">CC BY SA</a>."
})

var stamen = new Basemap({
  baseLayers: [mapBaseLayer],
  title: 'Terrain',
  id: 'terrain',
  thumbnailUrl: 'https://stamen-tiles.a.ssl.fastly.net/terrain/10/177/409.png'
})

// App
app = {
  scale: 50000000,
  center: [-98, 39],
  initialExtent: null,
  basemap: "satellite",
  viewPadding: {
    top: 50, bottom: 0
  },
  uiPadding: {
    top: 15, bottom: 15
  },
  mapView: null,
  sceneView: null,
  activeView: null,
  searchWidgetNav: null
};
// Map 
var map = new Map({
  basemap: app.basemap,
  ground: "world-elevation"
});

app.mapView = new MapView({
  container: "mapViewDiv", // use same container??
  map: map,
  scale: app.scale,
  center: app.center,
  padding: app.viewPadding,
  ui: {
    components: ["zoom", "compass", "attribution"],
    padding: app.uiPadding
  },
});

// Scene
var mapScene = new Map({
  basemap: app.basemap,
  ground: "world-elevation"
});

app.sceneView = new SceneView({
  container: "sceneViewDiv",
  map: map,
  // map: mapScene,
  scale: app.scale,
  center: app.center,
  padding: app.viewPadding,
  ui: {
    padding: app.uiPadding
  },
  popup: {
    autoPanEnabled: true
  },
  environment: {
    starsEnabled: false
  }
});
app.activeView = app.mapView;

function firstView(view) {
  // var query = new Query({
  // })
  function getGraphics(response, layer) {
    layer.source.items.map(graphic => {
      if (graphic.symbol === highlightStyle([[232,14,14,.6], [232,14,14]], graphic)) {
        layer.graphics
      }
    })
  }

  view.on('layerview-create', function(e) {
    if (e.layer.id === 0) {
      // console.log('gacc')
      // var gaccLayer = map.findLayerById(0)
      var gaccLayer = e.layer
      // var x = gaccLayer.source.items[0].geometry.extent.center.longitude
      // var y = gaccLayer.source.items[0].geometry.extent.center.latitude
      // view.center = [x, y]
      var extent = gaccLayer.source.items[0].geometry.extent
      gaccLayer.fullExtent = extent
      view.goTo(gaccLayer.fullExtent, {
        animate: false
      }).otherwise(err => console.log(err))
    }
    if (e.layer.id === 'nfires') {
      // var nfiresLayer = e.layer
      // console.log(nfiresLayer)
      // view.then(() => {
      //   console.log('nfires')
      //   view.whenLayerView(nfiresLayer)
      //   .then(layerView => {
      //     watchUtils.whenFalseOnce(layerView, 'updating', () => {
      //       view.on('pointer-move', e => {
      //         var screenPoint = { x: e.x, y: e.y }
      //         view.hitTest(screenPoint)
      //         .then(res => getGraphics(res, nfiresLayer))
      //         // .then(res => console.log(res))
      //         .otherwise(err => console.log(err))
      //       })
      //     })
      //   }).otherwise(err => console.log(err))
      // }).otherwise(err => console.log(err))
    }

  })

}

app.activeView.then(function(view) {
  firstView(view)
  app.initialExtent = app.activeView.extent;
}).otherwise(err => console.log(err));

app.legend = createLegend(app.activeView)
function createLegend(view) {
  console.log('hi')
  return new Legend({
    view,
    // layerInfos: [
    //   { layer: map.findLayerById('nfires'), title: 'New Fires' }
    //   // { layer: map.findLayerById('ofires'), title: 'Ongoing Fires' }
    // ],
    container: 'legendDiv'
  })
} 

var scaleBar = new ScaleBar({ view: app.activeView })
app.activeView.ui.add(scaleBar, "bottom-left") 


app.layerList = createLayerList('layersDiv')
function createLayerList(parentId) {
  return new LayerList({
    viewModel: {
      view: app.activeView,
    }
  }, parentId)
} 

// Search Widgets
app.searchWidgetNav = createSearchWidget("searchNavDiv");
function createSearchWidget(parentId) {
  var search = new Search({
    viewModel: {
      view: app.activeView,
      highlightEnabled: false,
      popupEnabled: true,
      showPopupOnSelect: true
    }
  }, parentId);
  return search;
}
// Popup and Panel Events

// Views - Listen to view size changes to show/hide panels
app.mapView.watch("size", viewSizeChange);
app.sceneView.watch("size", viewSizeChange);
function viewSizeChange(screenSize) {
  if (app.screenWidth !== screenSize[0]) {
    app.screenWidth = screenSize[0];
    setPanelVisibility();
  }
}

// Popups - Listen to popup changes to show/hide panels
app.mapView.popup.watch(["visible", "currentDockPosition"], setPanelVisibility);
app.sceneView.popup.watch(["visible", "currentDockPosition"], setPanelVisibility);
// Panels - Show/hide the panel when popup is docked
function setPanelVisibility() {
   var isMobileScreen = app.activeView.widthBreakpoint === "xsmall" || app.activeView.widthBreakpoint === "small",
    isDockedVisible = app.activeView.popup.visible && app.activeView.popup.currentDockPosition,
    isDockedBottom = app.activeView.popup.currentDockPosition && app.activeView.popup.currentDockPosition.indexOf("bottom") > -1;
  // Mobile (xsmall/small)
  if (isMobileScreen) {
    if (isDockedVisible && isDockedBottom) {
      query(".calcite-panels").addClass("invisible");
    } else {
      query(".calcite-panels").removeClass("invisible");
    }
  } else { // Desktop (medium+)
    if (isDockedVisible) {
      query(".calcite-panels").addClass("invisible");
    } else {
      query(".calcite-panels").removeClass("invisible");          
    }
  }
}
// Panels - Dock popup when panels show (desktop or mobile)
query(".calcite-panels .panel").on("show.bs.collapse", function(e) {
  if (app.activeView.popup.currentDockPosition || app.activeView.widthBreakpoint === "xsmall") {
    app.activeView.popup.dockEnabled = false;
  }
});
// Panels - Undock popup when panels hide (mobile only)
query(".calcite-panels .panel").on("hide.bs.collapse", function(e) {
  if (app.activeView.widthBreakpoint === "xsmall") {
    app.activeView.popup.dockEnabled = true;
  }
});
// Tab Events (Views)
query(".calcite-navbar li a[data-toggle='tab']").on("click", function(e) {
  syncTabs(e);
  if (e.target.text.indexOf("Map") > -1) {
    syncViews(app.sceneView, app.mapView);                  
    app.activeView = app.mapView;  
  } else {
    syncViews(app.mapView, app.sceneView);                  
    app.activeView = app.sceneView;
  }
  syncSearch();     
}); 
// Tabs
function syncTabs(e) {
  query(".calcite-navbar li.active").removeClass("active");       
  query(e.target).addClass("active");
}
// Views
function syncViews(fromView, toView) {
  watchUtils.whenTrueOnce(toView, "ready").then(function(result) {
    watchUtils.whenTrueOnce(toView, "stationary").then(function(result) {
      function nextView(view) {
        var lyr = map.findLayerById(0)
        // var x = lyr.source.items[0].geometry.extent.center.longitude
        // var y = lyr.source.items[0].geometry.extent.center.latitude
        // view.center = [x, y]
        var extent = lyr.source.items[0].geometry.extent
        lyr.fullExtent = extent
        view.goTo(lyr.fullExtent, {
          animate: false
        }).otherwise(err => console.log(err))
      }
      // toView.goTo(fromView.viewpoint);
      nextView(toView)
      createLegend(toView)  
      toView.popup.reposition();
    });
  });
}


// Search Widgets
function syncSearch() {
  app.searchWidgetNav.viewModel.view = app.activeView;
  // Sync
  if (app.searchWidgetNav.selectedResult) {
    app.searchWidgetNav.search(app.searchWidgetNav.selectedResult.name);
  }
  app.activeView.popup.reposition();
}
// Basemap events
query("#selectBasemapPanel").on("change", function(e){
  app.mapView.map.basemap = e.target.options[e.target.selectedIndex].dataset.vector;
  app.sceneView.map.basemap = e.target.value;
});  
// Collapsible popup (optional)
query(".esri-popup .esri-title").on("click", function(e){
  query(".esri-popup .esri-container").toggleClass("esri-popup-collapsed");
  app.activeView.popup.reposition();
});
// Toggle nav
function closeMenu() {
  if (query(".calcite-dropdown.open")[0]) {
    query(".calcite-dropdown, .calcite-dropdown-toggle").removeClass("open");
  }
}
// Listen for clicks away from menu
app.mapView.on("click", function(e) {
  closeMenu();
});
app.sceneView.on("click", function(e) {
  closeMenu();
});

}) // end of function

})(gaccProps[id])