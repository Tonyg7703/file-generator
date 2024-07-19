// import path from 'path';
// import { dirnames } from '../settings';
// import FS, { DataType, Directory } from './FS';

// interface Props<Folder, File> {
//   route: string;
//   dirname?: string | 'main';
//   folders?: readonly Folder[];
//   files?: readonly File[];
// }

// export default class Path<
//     D extends DataType = DataType,
//     FO extends Directory = Directory,
//     FI extends FileProps<D> = FileProps<D>
//   >
//   extends FS<D>
//   implements Props<FO, FI>
// {
//   route: string;
//   dirname?: string | 'main';
//   folders?: readonly FO[];
//   files?: readonly FI[];

//   constructor({
//     route,
//     folders,
//     files,
//     dirname = dirnames.main,
//   }: Props<FO, FI>) {
//     super();
//     this.route = route;

//     if (dirname === 'main') {
//       this.dirname = path.resolve(path.dirname(require.main!.filename), '..');
//     } else {
//       this.dirname = dirname;
//     }

//     this.folders = folders;
//     this.files = files;
//     this.init();
//   }

//   init() {
//     this.createDir(this.getDirPath());
//     this.folders?.forEach((folder) => {
//       this.createDir(this.getDirPath(folder));
//     });
//   }

//   public getDirPath(folder?: FO) {
//     const { dirname, route } = this;
//     if (!folder) return `${dirname}/${route}`;
//     return `${dirname}/${route}/${folder}`;
//   }

//   public getFilePath(file: FI, folder?: FO) {
//     if (!folder) return `${this.getDirPath()}/${file}`;
//     return `${this.getDirPath(folder)}/${file}`;
//   }
// }
