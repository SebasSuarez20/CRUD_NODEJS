import { Router, Request, Response } from "express";
import TaskBook from "../Model/TaskBook";


class RouterBook {

  public router: Router;

  constructor() {
    this.router = Router();
    this.InitRouter();
  }

  private InitRouter(): void {
    this.router.get('/', this.GetBook);
    this.router.post('/index', this.PostBook);
    this.router.put('/index/:id', this.PutBook);
    this.router.put('/index/UpdateBook/:id', this.DisableBook);
    this.router.delete('/index/:id', this.DeleteBook);
  }


  private async GetBook(req: Request, res: Response): Promise<void> {
    const min = req.query.min.toString();
    const max = req.query.max.toString();
    const body = await TaskBook.find({ enabled: true }).skip(parseInt(min)).limit(parseInt(max));
    res.status(200).send({ data: body })
  }

  private async PostBook(req: Request, res: Response): Promise<void> {
    const data = req.body;
    await TaskBook.create(data);
    res.status(200).send({ Msg: "Se inserto excelente!!!" });
  }

  private async PutBook(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const data = req.body;
    await TaskBook.findOneAndUpdate({ _id: id }, data);
    res.status(200).send({ Msg: "Se actualizo correctamente" });
  }

  private async DisableBook(req: Request, res: Response): Promise<void> {
    const BookId = req.params.id;
    await TaskBook.findOneAndUpdate({ _id: BookId }, { enabled: false });
    res.status(200).send({ Msg: 'Actualizado Libro correctamente' });
  }

  private async DeleteBook(req: Request, res: Response): Promise<void> {
    const Bookid = req.params.id;
    const Result = await TaskBook.deleteOne({ _id: Bookid });
    res.json({ deleteCount: Result.deletedCount })
  }

}

const PathBook = new RouterBook();
export default PathBook.router;
