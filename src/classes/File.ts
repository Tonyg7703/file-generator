import fs from 'fs';
import FS, { FSProps } from './FS';
import { v4 as uuidv4 } from 'uuid';

export type FileData = object | string | undefined;
export type FileFormat = 'txt' | 'json';

export type FileProps<D extends FileData = FileData | undefined> = {
  format: FileFormat;
  data?: D;
} & FSProps;

export type FileOptions = {
  canReplace?: boolean;
  canCreateEmpty?: boolean;
};

type ID = string | number;

export type JSONData<T> = {
  id?: ID;
  uuid?: string;
} & T;

export type JSONFileProps<T> = {
  data?: (T & { id?: ID })[];
  options?: FileOptions;
} & FSProps;

export default class JSONFile<T extends object = object> extends FS {
  private format;
  private _data: JSONData<T>[] = [];
  private _options: FileOptions = {
    canReplace: false,
    canCreateEmpty: false,
  };

  constructor({
    route,
    name,
    data = [],
    options,
  }: JSONFileProps<T> & FileOptions) {
    super('file', route, name);
    this.format = 'json';
    this.options = options;

    if (data.length === 0 && this.exists()) {
      this.fetch();
    } else {
      this.create(data);
    }
  }

  private create(data: T[]): JSONData<T>[] {
    this.checkFolderExists('create');

    const { canCreateEmpty, canReplace } = this.options;
    const fileExists = this.exists('file');
    if (fileExists) {
      if (canReplace) {
        if (canCreateEmpty && data.length === 0) {
          this.replaceAll(data);
        } else if (data.length > 0) {
          this.replaceAll(data);
        }
      }
    } else {
      if ((canCreateEmpty && data.length === 0) || data.length > 0) {
        this.data = data;
      }
    }

    return this._data;
  }

  public get data(): JSONData<T>[] {
    this.fetch();
    return this._data;
  }

  private set data(data: JSONData<T>[]) {
    this._data = data;
    this.save();
  }

  public get path(): string {
    return `${this.route}/${this.name}.${this.format}`;
  }

  private get options(): FileOptions {
    return this._options;
  }

  private set options(options: FileOptions | undefined) {
    if (!options) return;
    this._options = { ...this._options, ...options };
  }

  public push(data: JSONData<T>[] | JSONData<T>): JSONData<T>[] {
    if (Array.isArray(data)) {
      const newData = [...this._data, ...data];
      this.data = newData;
    } else {
      const newData = [...this._data, data];
      this.data = newData;
    }

    return this._data;
  }

  public updateOne({ uuid, id, ...value }: JSONData<T>): JSONData<T>[] {
    const index = this.data.findIndex((item) => {
      return item.id === id || item.uuid === uuid;
    });

    if (index !== -1) {
      this._data[index] = { ...this._data[index], ...value };
      this.save();
    }

    return this._data;
  }

  // public updateMany(key: keyof T, value: T[keyof T]): JSONData<T>[] {
  //   this.data = this._data.map((data) => ({ ...data, [key]: value }));
  //   return this._data;
  // }

  public replaceAll(data: JSONData<T>[]): JSONData<T>[] {
    this.erase();
    this.data = data;
    return this._data;
  }

  private addUUID(data: T | JSONData<T>): JSONData<T> {
    if ('uuid' in data) return data;
    const uuid = this.generateUUID();
    return { ...data, uuid };
  }

  private generateUUID() {
    const uuid = uuidv4();
    return uuid;
  }

  private fetch(): void {
    if (this.exists()) {
      const data = fs.readFileSync(this.path, 'utf-8');
      if (data) this._data = JSON.parse(data);
    }
  }

  private save(checkUUIDs = true): void {
    if (checkUUIDs) {
      const dataWithUUID = this._data.map((item) => this.addUUID(item));
      this._data = dataWithUUID;
    }

    this.checkFolderExists('save');
    fs.writeFileSync(this.path, JSON.stringify(this._data, null, 2));
  }

  public erase(): void {
    if (!this.exists) return;
    fs.unlinkSync(this.path);
  }
}
