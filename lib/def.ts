export type Customer = {
    id: number;
    name: string;
  };

  export type PrintType = {
    id: number;
    name: string;
  };

  export type Material = {
    id: number,
    name: string;
  };

  export type Job = {
    jobName?: string;
    customerId?: number;
    materials?: number[];
    printType?: number;
    printCustomerName?: boolean;
    customTextDetails?: string;
    notes?: string;
  };