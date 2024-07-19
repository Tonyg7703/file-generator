import fs from 'fs';
import FS, { FSProps } from './FS';

export type FileData = object | string | undefined;
export type FileFormat = 'txt' | 'json';

export type FileProps<D extends FileData = FileData | undefined> = {
  format: FileFormat;
  data?: D;
} & FSProps;

export type SubfileProps = Omit<FileProps, 'route'>;

export type FileOptions = {
  canReplace?: boolean;
  canCreateEmpty?: boolean;
  canUpdateOnCreate?: boolean;
};

type ReadProps = {
  bufferEncoding?: BufferEncoding;
};

export default class JSONFile extends FS {
  private format;
  private data;
  private _options: FileOptions = {
    canReplace: false,
    canCreateEmpty: false,
    canUpdateOnCreate: false,
  };

  constructor({ route, name, format, data }: FileProps, options?: FileOptions) {
    super('file', route, name);
    this.format = format;
    this.options = options;

    this.checkFolderExists('constructor');
    if (data && this.exists()) {
      this.update(data);
    } else if (data) {
      this.data = data;
      this.write(options);
    } else {
      this.write(options);
    }
  }

  public get path() {
    return `${this.route}/${this.name}.${this.format}`;
  }

  public get options(): FileOptions {
    return this._options;
  }

  public set options(options: FileOptions | undefined) {
    if (!options) return;
    this._options = { ...this._options, ...options };
  }

  public read(): FileData {
    this.checkPathExists('read');
    const data = fs.readFileSync(this.path, 'utf-8');
    if (!data) return;
    this.data = JSON.parse(data);
    return data;
  }

  private write(data: FileData, options?: FileOptions) {
    this.options = options;
    const { canCreateEmpty, canReplace } = this.options;

    if (!data && !canCreateEmpty) return this;

    this.checkFolderExists('write');

    if (this.exists()) {
      this.check(!canReplace, {
        message: 'File already exists and cannot be replaced',
        method: 'write',
      });

      if (canReplace) this.delete();
    }

    if (!canCreateEmpty) return this;

    switch (typeof data) {
      case 'object':
        if (Array.isArray(data)) {
          fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
          break;
        }
        console.log(data);
        fs.writeFileSync(this.path, JSON.stringify([data], null, 2));
        // fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
        break;
      case 'string':
        fs.writeFileSync(this.path, data);
        break;
      default:
        fs.writeFileSync(this.path, '');
        break;
    }

    return this;
  }

  public delete() {
    if (this.exists('file')) {
      fs.unlinkSync(this.path);
    }
  }

  public update(data: FileData) {
    let newData: FileData;

    if (!data) return;

    if (!this.data) this.read();

    const existingData = this.read();

    switch (typeof existingData) {
      case 'undefined':
        newData = data;
        break;
      case 'string':
        this.check(typeof data !== 'string', {
          message: 'Data must be a string, not an object',
          method: 'update',
        });
        newData = data;
        break;
      case 'object':
        this.check(typeof data !== 'object', {
          message: 'Data must be an object, not a string',
          method: 'update',
        });

        console.log('first');
        if (Array.isArray(existingData) && Array.isArray(data)) {
          newData = [...existingData, ...data];
          break;
        }

        if (Array.isArray(existingData) && !Array.isArray(data)) {
          newData = [...existingData, data];
          break;
        }

        if (!Array.isArray(existingData) && Array.isArray(data)) {
          newData = [existingData, ...data];
          break;
        }

        if (!Array.isArray(existingData) && !Array.isArray(data)) {
          newData = [existingData, data];
          break;
        }

      // newData = { ...existingData, ...(data as object) };
    }
    console.log(newData);
    this.write({ data: newData });
  }
}
