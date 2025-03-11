import { CommentsModel } from "./model/imp/sequelize/CommentsModel";
import { DoctorModel } from "./model/imp/sequelize/DoctorModel";
import { FileModel } from "./model/imp/sequelize/FileModel";
import { PostFileModel } from "./model/imp/sequelize/PostFileModel";
import { PostModel } from "./model/imp/sequelize/PostModel";

DoctorModel.sync({ logging: false });
// CommentsModel.sync({ logging: false });
// FileModel.sync({ logging: false });
// PostFileModel.sync({ logging: false });
// PostModel.sync({ logging: false });