import fs from 'fs';

type ErrorMessage = {
  message: string;
  method: string;
};

export type FSType = 'file' | 'folder';

export type FSProps = {
  type?: FSType;
  route: string;
  name: string;
};

export default abstract class FS {
  constructor(public type: FSType, public route: string, public name: string) {}

  public get path() {
    return `${this.route}/${this.name}`;
  }

  protected exists(fsType?: FSType) {
    switch (fsType) {
      case 'folder':
        return fs.existsSync(this.route);
      case 'file':
        return fs.existsSync(this.path);
      default:
        return fs.existsSync(this.path);
    }
  }

  protected check(
    condition: boolean | undefined,
    errorMessage: ErrorMessage,
    throwError = true
  ): boolean | undefined | never {
    if (!condition) return condition;
    const message = this.getErrorMessage(errorMessage);
    if (throwError) throw new Error(message);
    return condition;
  }

  protected checkFolderExists(method: ErrorMessage['method']) {
    this.check(!this.exists('folder'), {
      message: `Folder does not exist at ${this.route}`,
      method: method,
    });
  }

  protected checkPathExists(method: ErrorMessage['method']) {
    this.check(!this.exists(), {
      message: `Path does not exist at ${this.path}`,
      method: method,
    });
  }

  private getErrorMessage({ message, method }: ErrorMessage) {
    const messageJson = {
      type: this.type.toUpperCase(),
      name: this.name,
      method,
      message,
      path: this.path,
    };

    const messageString = JSON.stringify(messageJson, null, 2);
    return messageString;
  }
}

// export type Directory = string;

// export default class FS<D extends DataType> {
//   public createDir(path: string): void {
//     if (!fs.existsSync(path)) {
//       fs.mkdirSync(path);
//     }
//   }

//   public createFile(file: FileProps<D>): void {
//     if (!file.data) {
//       throw new Error(
//         `Data is required to create a file at ${this.getFilePath(file)}`
//       );
//     }

//     const { data, route, name, extension: format } = file;
//     const filename = `${name}.${format}`;
//     const path = this.getPath(route, filename);

//     if (!this.exists(route)) {
//       throw new Error(`Directory does not exist at ${route}`);
//     }

//     if (this.exists(path)) {
//       throw new Error(`File already exists at ${path}`);
//     }

//     if (typeof data === 'string') {
//       fs.writeFileSync(path, data);
//     }

//     fs.writeFileSync(path, JSON.stringify(data, null, 2));
//   }

//   public fetchFile(file: FileProps<D>): string {
//     const filePath = this.getFilePath(file);
//     if (!this.exists(filePath)) {
//       throw new Error(`File does not exist at ${filePath}`);
//     }

//     return fs.readFileSync(filePath, 'utf8');
//   }

//   public getFilePath(file: FileProps<D>): string {
//     const { route, name, extension: format } = file;
//     return `${route}/${name}.${format}`;
//   }

//   public exists(folderPath: string): boolean {
//     return fs.existsSync(folderPath);
//   }

//   public isFolderEmpty(folderPath: string): boolean {
//     if (!this.exists(folderPath)) return true;
//     const files = fs.readdirSync(folderPath);
//     return files.length === 0;
//   }

//   public getFileCountFromDirectory(folderPath: string): number | -1 {
//     if (!this.exists(folderPath)) return -1;
//     const files = fs.readdirSync(folderPath);
//     return files.length;
//   }
// }
