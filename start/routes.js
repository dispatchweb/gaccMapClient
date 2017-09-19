'use strict'
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.get('/prod/:id', ({ params }) => {
  const id = params.id;
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<link rel="icon" href="https://www.esri.com/favicon.ico">
<title>Fire Activity</title>
<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/fonts/glyphicons-halflings-regular.ttf" rel="application/font-woff">
<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/fonts/glyphicons-halflings-regular.woff" rel="application/font-woff">
<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/fonts/glyphicons-halflings-regular.woff2" rel="application/font-woff">
<link rel="stylesheet" href="https://dispatchweb.us/css/calcite-maps-bootstrap.min-v0.4.css">
<link rel="stylesheet" href="https://dispatchweb.us/css/calcite-maps-arcgis-4.x.min-v0.4.css">
<link rel="stylesheet" href="https://js.arcgis.com/4.4/esri/css/main.css">
<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
</head>
<script>var id = '${id}'</script>
<body class="calcite-maps calcite-nav-top">
<!-- Navbar -->
<nav class="navbar calcite-navbar navbar-fixed-top calcite-text-light calcite-bg-dark calcite-bgcolor-dark-blue">
  <!-- Menu -->
  <div class="dropdown calcite-dropdown calcite-bg-light calcite-text-dark" role="presentation">
    <a class="dropdown-toggle" role="menubutton" aria-haspopup="true" aria-expanded="false" tabindex="0">
      <div class="calcite-dropdown-toggle">
        <span class="sr-only">Toggle dropdown menu</span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </a>
    <ul class="dropdown-menu calcite-menu-drawer">
      <li><a class="hidden-md hidden-lg" href="#2dTab" aria-controls="2Dtab" role="tab" data-toggle="tab"> Map</a></li>
      <li><a class="active hidden-md hidden-lg" href="#3dTab" aria-controls="3Dtab" role="tab" data-toggle="tab"> Scene</a></li>
      <li><a role="menuitem" tabindex="0" data-target="#panelInfo" aria-haspopup="true"><span class="glyphicon glyphicon-info-sign"></span> Info</a></li>
      <li><a role="menuitem" tabindex="0" data-target="#panelBasemaps" aria-haspopup="true"><span class="glyphicon glyphicon-th-large"></span> Basemaps</a></li>
      <li><a role="menuitem" tabindex="0" href="#" data-target="#panelLegend" aria-haspopup="true"><span class="glyphicon glyphicon-list-alt"></span> Legend</a></li>
      <li><a role="menuitem" tabindex="0" href="#" data-target="#panelLayers" aria-haspopup="true"><span class="glyphicon glyphicon-list"></span> Layers</a></li>
      <li><a role="menuitem" tabindex="0" id="calciteToggleNavbar" aria-haspopup="true"><span class="glyphicon glyphicon-fullscreen"></span> Full Map</a></li>
    </ul>
  </div>
  <!-- Title -->
  <div class="calcite-title calcite-overflow-hidden">
    <span class="calcite-title-main">
      <!-- <img src="https://dispatchweb.us/images/${id}.png" style="width:60px;height:40px;"> -->
      <img src="https://dispatchweb.us/images/${id}.png" style="width:56.25px;height:45px;">
    </span>
    <span class="calcite-title-divider hidden-xs"></span>
    <span class="calcite-title-sub hidden-xs">Current Fire Activity</span> 
  </div>
   <!-- Nav -->
  <ul class="calcite-nav nav navbar-nav">                    
    <li class="active"><a id="mapNav" class="hidden-xs hidden-sm" href="#2dTab" aria-controls="2Dtab" aria-expanded="true" role="tab" data-toggle="tab" data-tooltip="tip" title="2D View" data-placement="bottom">Map</a></li>
    <li><a id="sceneNav" class="hidden-xs hidden-sm" href="#3dTab" aria-controls="3Dtab" role="tab" data-toggle="tab" data-tooltip="tip" title="3D View" data-placement="bottom">Scene</a></li>                  
    <li><div class="calcite-navbar-search calcite-search-expander"><div id="searchNavDiv"></div></div></li>
  </ul>
</nav><!--/.navbar -->

<!-- Map Container  -->

<div class="calcite-map calcite-map-absolute">
  <div id="tabContainer" class="tab-content">
    <div id="2dTab" class="tab-pane fade in active" role="tabpanel">
       <div id="mapViewDiv"></div>
    </div>
    <div id="3dTab" class="tab-pane fade" role="tabpanel">
      <div id="sceneViewDiv"></div>
    </div>
  </div>
</div>

<!-- Panel Container -->

<div class="calcite-panels calcite-panels-right calcite-bg-custom calcite-text-light calcite-bgcolor-dark-blue panel-group" role="tablist" aria-multiselectable="true">
      
  <!-- Info Panel -->
  
  <div id="panelInfo" class="panel collapse">
    <div id="headingInfo" class="panel-heading" role="tab">
      <div class="panel-title">
        <a class="panel-toggle" role="button" data-toggle="collapse" href="#collapseInfo"  aria-expanded="true" aria-controls="collapseInfo"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span><span class="panel-label">Info</span></a> 
        <a class="panel-close" role="button" data-toggle="collapse" tabindex="0" href="#panelInfo"><span class="esri-icon esri-icon-close" aria-hidden="true"></span></a>  
      </div>
    </div>
    <div id="collapseInfo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingInfo">
      <div class="panel-body">
        <p>The main styles used in this app are:</p>
        Body
        <li>calcite-nav-top</li>
        <br>
        Nav
        <li>calcite-bgcolor-dark-blue</li>
        <li>calcite-text-light</li>
        <br>
        Dropdown
        <li>calcite-menu-drawer</li>
        <br>
        Panels
        <li>calcite-panels-right</li>
        <li>calcite-bg-custom</li>
      </div>
   </div>
  </div>

  <!-- Basemaps Panel -->
  
  <div id="panelBasemaps" class="panel collapse"> 
    <div id="headingBasemaps" class="panel-heading" role="tab">
      <div class="panel-title">
        <a class="panel-toggle collapsed" role="button" data-toggle="collapse" href="#collapseBasemaps" aria-expanded="false" aria-controls="collapseBasemaps"><span class="glyphicon glyphicon-th-large" aria-hidden="true"></span><span class="panel-label">Basemaps</span></a> 
        <a class="panel-close" role="button" data-toggle="collapse" tabindex="0" href="#panelBasemaps"><span class="esri-icon esri-icon-close" aria-hidden="true"></span></a>  
      </div>
    </div>
    <div id="collapseBasemaps" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingBasemaps">
      <div class="panel-body">
        <select id="selectBasemapPanel" class="form-control">
          <option value="streets" data-vector="streets-vector">Streets</option>
          <option value="satellite" data-vector="satellite" selected="">Satellite</option>
          <option value="hybrid" data-vector="hybrid">Hybrid</option>
          <option value="national-geographic" data-vector="national-geographic">National Geographic</option>
          <option value="topo" data-vector="topo-vector">Topographic</option>
          <option value="gray" data-vector="gray-vector">Gray</option>
          <option value="dark-gray" data-vector="dark-gray-vector">Dark Gray</option>
          <option value="osm" data-vector="osm">Open Street Map</option>
          <option value="dark-gray" data-vector="streets-night-vector">Streets Night</option>
          <option value="streets" data-vector="streets-navigation-vector">Streets Mobile</option>
        </select>
      </div>
    </div>
  </div>
  <!-- Panel - Legend -->
  <div id="panelLegend" class="panel collapse in">
    <div id="headingLegend" class="panel-heading" role="tab">
      <div class="panel-title">
        <a class="panel-toggle" role="button" data-toggle="collapse" href="#collapseLegend" aria-expanded="false" aria-controls="collapseLegend"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span><span class="panel-label">Legend</span></a> 
        <a class="panel-close" role="button" data-toggle="collapse" tabindex="0" href="#panelLegend"><span class="esri-icon esri-icon-close" aria-hidden="true"></span></a> 
      </div>
    </div>
    <div id="collapseLegend" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingLegend">
      <div class="panel-body">            
        <div id="legendDiv"></div>
      </div>
    </div>
  </div>
  <!-- Panel - Layers -->
  <div id="panelLayers" class="panel collapse">
    <div id="headingLayers" class="panel-heading" role="tab">
      <div class="panel-title">
        <a class="panel-toggle" role="button" data-toggle="collapse" href="#collapseLayers" aria-expanded="false" aria-controls="collapseLayers"><span class="glyphicon glyphicon-list" aria-hidden="true"></span><span class="panel-label">Layers</span></a> 
        <a class="panel-close" role="button" data-toggle="collapse" tabindex="0" href="#panelLayers"><span class="esri-icon esri-icon-close" aria-hidden="true"></span></a> 
      </div>
    </div>
    <div id="collapseLayers" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingLayers">
      <div class="panel-body">            
        <div id="layersDiv"></div>
      </div>
    </div>
  </div>  
</div> <!-- /.calcite-panels -->

<script type="text/javascript">
  // var dojoConfig = {
  //   packages: [{
  //     name: "bootstrap",
  //     location: location.pathname.replace(/\/[^/]+$/, "") + "./vendor/dojo-bootstrap"
  //   },
  //   {
  //     name: "calcite-maps",
  //     location: location.pathname.replace(/\/[^/]+$/, "") + "./js/dojo"
  //   }]
  // };
var dojoConfig = {
  packages: [{
    name: "bootstrap",
    location: "https://esri.github.io/calcite-maps/dist/vendor/dojo-bootstrap"
  },
  {
    name: "calcite-maps",
    location: "https://esri.github.io/calcite-maps/dist/js/dojo"
  }]
}  
</script>

<!-- ArcGIS JS 4 -->
<script src="https://js.arcgis.com/4.4/"></script>

<script src='https://dispatchweb.us/js/script.js'></script>

</body>
</html>
  `
})

// Route.get('/:id', async ({ params }) => {
//   const id = params;
//   console.log(id)
//   return mapfile(makemap())
// })

// Route.get('/', ({ view }) => {
//   return view.render('home')
// })