export interface Shipment {
    id: number;
    origin: string;
    destination: string;
    status: 'In Transit' | 'Delivered' | 'Delayed';
    estimatedDelivery: string;
  }
  