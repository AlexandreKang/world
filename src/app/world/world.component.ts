import "core-js/shim";
import { Component, NgZone} from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
// Importing geodata (map data)
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
// Importing geodata (usa data)
import am4geodata_usaHigh from "@amcharts/amcharts4-geodata/usaHigh";
// Importing geodata (usa data)
import am4geodata_canadaHigh from "@amcharts/amcharts4-geodata/canadaHigh";
// Importing themes
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import am4themes_dark from "@amcharts/amcharts4/themes/dark";

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dark);

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})

export class WorldComponent {
  title = 'world';

constructor(private zone: NgZone) {}

ngAfterViewInit() {
  this.zone.runOutsideAngular(() => {
    let chart = am4core.create("chartdiv", am4maps.MapChart);
    chart.geodata = am4geodata_worldHigh;
    chart.projection = new am4maps.projections.Miller();
    
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    
    let usaSeries = chart.series.push(new am4maps.MapPolygonSeries());
    usaSeries.geodata = am4geodata_usaHigh
    usaSeries.useGeodata = true;

    let canadaSeries = chart.series.push(new am4maps.MapPolygonSeries());
    canadaSeries.geodata = am4geodata_canadaHigh
    canadaSeries.useGeodata = true;

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#61605f");

    polygonTemplate.events.on("hit", function(ev) {
    ev.target.series.chart.zoomToMapObject(ev.target)
    });

    let usaTemplate = usaSeries.mapPolygons.template;
    usaTemplate.tooltipText = "{name}";
    usaTemplate.fill = am4core.color("#61605f");

    usaTemplate.events.on("hit", function(ev) {
    ev.target.series.chart.zoomToMapObject(ev.target)
    });

    let canadaTemplate = canadaSeries.mapPolygons.template;
    canadaTemplate.tooltipText = "{name}";
    canadaTemplate.fill = am4core.color("#61605f");

    canadaTemplate.events.on("hit", function(ev) {
    ev.target.series.chart.zoomToMapObject(ev.target)
    });

    let hs = polygonTemplate.states.create("hover");
    let hus = usaTemplate.states.create("hover");
    let hcan = canadaTemplate.states.create("hover");

    hs.properties.fill = am4core.color("#6037f5");
    hus.properties.fill = am4core.color("#6037f5");
    hcan.properties.fill = am4core.color("#6037f5");

  chart.zoomControl = new am4maps.ZoomControl();
  chart.zoomControl.slider.height = 100;

  let button = chart.chartContainer.createChild(am4core.Button);
  // button.label.text = "Home";
  button.padding(5, 5, 5, 5);
  button.width = 50;
  button.align = "right";
  button.marginRight = 15;
  button.events.on("hit", function() {
    chart.goHome();
  });
  button.icon = new am4core.Sprite();
  button.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
}) 
}
}