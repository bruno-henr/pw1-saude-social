import { Comments } from "./model/Comments";
import { Doctor } from "./model/Doctor";
import { File } from "./model/File";
import { Post } from "./model/Post";
import { PostFile } from "./model/PostagemArquivo";

Doctor.sync({ logging: false });
Comments.sync({ logging: false });
File.sync({ logging: false });
Post.sync({ logging: false });
PostFile.sync({ logging: false });