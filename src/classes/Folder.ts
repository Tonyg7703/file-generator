import fs from 'fs';
import JSONFile, { JSONFileProps } from './File';
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

  public newFile<T extends object>(
    props: Omit<JSONFileProps<T>, 'route' | 'type'>
  ) {
    const newFile = new JSONFile<T>({
      ...props,
      route: this.path,
    });
    this.data.push(newFile);
    return newFile;
  }

  load() {
    const allFiles = fs.readdirSync(this.path);
    allFiles.forEach((filename) => {
      const stats = fs.statSync(`${this.path}/${filename}`);

      if (stats.isDirectory()) {
        this.data.push(new Folder({ name: filename, route: this.path }));

        //   this.data.push(new Folder({ name: file, route: this.path }));
      } else {
        //   this.data.push(new JSONFile({ name: file, route: this.path }));
      }
    });

    // const stats = fs.statSync(`${this.path}/${file}`);
    // if (stats.isDirectory()) {
    //   this.data.push(new Folder({ name: file, route: this.path }));
    // } else {
    //   this.data.push(new JSONFile({ name: file, route: this.path }));
    // }
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

  public getFileByName(name: FSProps['name']) {
    return this.files.find((file) => file.name === name);
  }

  public getFolderByName(name: FSProps['name']) {
    return this.folders.find((folder) => folder.name === name);
  }
}
