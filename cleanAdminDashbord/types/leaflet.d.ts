declare module 'leaflet' {
  export interface DivIconOptions {
    className?: string;
    html?: string;
    iconSize?: [number, number];
    iconAnchor?: [number, number];
    popupAnchor?: [number, number];
  }

  export function divIcon(options: DivIconOptions): any;
}

declare module 'react-leaflet' {
  import { ComponentType } from 'react';
  
  export interface MapContainerProps {
    center: [number, number];
    zoom: number;
    style?: React.CSSProperties;
    scrollWheelZoom?: boolean;
    children?: React.ReactNode;
  }

  export interface TileLayerProps {
    attribution?: string;
    url: string;
  }

  export interface MarkerProps {
    position: [number, number];
    icon?: any;
    children?: React.ReactNode;
  }

  export interface PopupProps {
    children?: React.ReactNode;
  }

  export const MapContainer: ComponentType<MapContainerProps>;
  export const TileLayer: ComponentType<TileLayerProps>;
  export const Marker: ComponentType<MarkerProps>;
  export const Popup: ComponentType<PopupProps>;
} 