document.addEventListener("DOMContentLoaded", function() {
	let platform = new H.service.Platform({
		'apikey': window.API_KEY
	});
				      
	// Obtain the default map types from the platform object:
	let defaultLayers = platform.createDefaultLayers();
      
	// Instantiate (and display) a map object:
    let map = new H.Map(
    	document.getElementById('mapContainer'),
		defaultLayers.vector.normal.map,
    	{
        	zoom: 4,
        	center: { lat: 39.83333, lng: -98.58333 }
   		}
    );

	let coordinates = window.CASES;
	let mapCoordinates = (coordinateString) => {
		let mappedCoordinates = coordinates.slice(2, -2).split("], [");
		return mappedCoordinates.map(coord => new H.clustering.DataPoint(
			coord.split(", ")[0],
			coord.split(", ")[1]
		));
	}

	let createdObjects = mapCoordinates(coordinates);
	let clusteredDataProvider = new H.clustering.Provider(createdObjects);
	// Create a layer that includes the data provider and its data points: 
	let layer = new H.map.layer.ObjectLayer(clusteredDataProvider);
	
	// Add the layer to the map:
	map.addLayer(layer);
	
	// Create a default UI instance:
	let ui = H.ui.UI.createDefault(map, defaultLayers);
	
	window.addEventListener('resize', () => map.getViewPort().resize());
	let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
});



			      
