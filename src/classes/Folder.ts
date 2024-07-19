import fs from 'fs';
import JSONFile, {
  FileFormat,
  FileOptions,
  FileProps,
  SubfileProps,
} from './File';
import FS, { FSProps } from './FS';

export type FolderProps = {
  data?: (JSONFile | Folder)[];
} & FSProps;

type SubfolderProps = Omit<FolderProps, 'route'>;

export default class Folder extends FS {
  data;

  constructor({ data = [], route, name }: FolderProps) {
    super('folder', route, name);
    this.data = data;
    this.create();
  }

  private create() {
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path);
    }
  }

  public get files() {
    return this.data.filter((data) => data.type === 'file');
  }

  public get folders() {
    return this.data.filter((data) => data.type === 'folder');
  }

  public newFile(
    input: SubfileProps | [name: string, format: FileFormat],
    options?: FileOptions
  ) {
    let props: FileProps;
    if (Array.isArray(input)) {
      props = { name: input[0], format: input[1], route: this.path };
    } else {
      props = { ...input, route: this.path };
    }

    const newFile = new JSONFile(props, options);
    this.data.push(newFile);
    return newFile;
  }

  public newFolder(input: SubfolderProps | string) {
    let props: FolderProps;
    if (typeof input === 'string') {
      props = { name: input, route: this.path };
    } else {
      props = { ...input, route: this.path };
    }

    const newFolder = new Folder(props);
    this.data.push(newFolder);
    return newFolder;
  }

  public getFile({ name }: { name: string }) {
    return this.files.find((file) => file.name === name);
  }

  public getFolder({ name }: { name: string }) {
    return this.folders.find((folder) => folder.name === name);
  }

  // public removeFile({ name }: { name: string }) {
  //   this.data = this.data.filter((data) => data.name !== name);
  // }

  // public removeFolder({ name }: { name: string }) {
  //   this.data = this.data.filter((data) => data.name !== name);
  // }

  // public getFile({
  //   propName = 'name',
  //   value,
  // }: {
  //   propName: keyof FileProps;
  //   value: string;
  // }) {
  //   return this.data.find((file) => file[propName] === value);
  // }

  // get files by include a string, or exclude a string,
  // public getFiles({}: {}) {}
}

// what is the typescript method that removes a property from an type?
// for example type: { a: string, b: number, c: boolean }
// I want it to return { a: string, b: number }
// it is called Omit
// thank you
// you're welcome
