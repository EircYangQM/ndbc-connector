export class ConnectionManager {
  static drivers: Map<string, Driver> = new Map<string, Driver>();

  static load(driverName: string, driver: Driver): void {
    if (ConnectionManager.drivers.has(driverName)) {
      return;
    }

    ConnectionManager.drivers.set(driverName, driver);
  }
  
  static connect(driverName: string, properties: Map<string, Driver>): Promise<Connection> {
    return new Promise<Connection>((resolve, reject) => {
      let driver: Driver | undefined = ConnectionManager.drivers.get(driverName);
      if (driver === undefined) {
        return reject(`The ${driverName} does not found.`);
      }

      return driver.connect(properties);
    });
  }
}

export interface Driver {
  connect(properties: Map<string, any>): Connection;
}

export interface Connection {
  createStatement(query:string): Promise<Statement>;
  getMetadata(): Promise<DatabaseMetaData>;
}

export interface DatabaseMetaData {
  getCatalogs(catalog: string): Promise<ResultSet>;
  getSchemas(catalog: string, schema: string): Promise<ResultSet>;
  getTables(catalog: string, schema: string, table: string, types:string[]): Promise<ResultSet>;
  getColumns(catalog: string, schema: string, table: string): Promise<ResultSet>;
  getProcedures(catalog:string, schema: string): Promise<ResultSet>;
  getProcedureParameters(catalog:string, schema: string, procedure:string): Promise<ResultSet>;
}

export interface Statement {
  execute(parameters: Map<string, any>): Promise<ResultSet>;
  executeNonQuery(parameters: Map<string, any>): Promise<number>;
}

export interface ResultSet {
  forEach(callback: (index: number, array: object[]) => void): void;
  next(): boolean;
  getValue(index: number): any;
  getValue(columnName: string): any;
  getMetadata(): ColumnInfo[];
}

export interface ColumnInfo {
  getColumnName(index: number): string;
  getDataType(index: number): string;
  getColumnCount(): number;
}