// js/screens/MapScreen.js - Map hub screen orchestrator

import { IndiaMap } from '../components/IndiaMap.js';
import { topHUD } from '../components/TopHUD.js';
import { playerState } from '../state/playerState.js';

export class MapScreen {
  constructor() {
    this.screenEl = null;
    this.indiaMap = null;
  }

  init() {
    this.screenEl = document.getElementById('screen-map');
    const mapContainer = document.getElementById('map-canvas-container');
    const infoPanel = document.getElementById('state-info-panel');

    if (mapContainer && infoPanel) {
      this.indiaMap = new IndiaMap();
      this.indiaMap.init(mapContainer, infoPanel);
    }
  }

  onEnter() {
    topHUD.show();
    if (this.indiaMap) {
      this.indiaMap.onEnter();
    }
  }

  onLeave() {}
}

export const mapScreen = new MapScreen();
