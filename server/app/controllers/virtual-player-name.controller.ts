import { Service } from 'typedi';
import { Request, Response, Router } from 'express';
import { ELEMENT_NOT_FOUNDED, HHTP_SUCCESSFUL_REQUEST, HTTP_STATUS_CREATED } from '@app/constants/constant';

@Service()
export class VirtualPlayerNameController {
    router: Router;

    advancedPlayername: string[] = ['James', 'Sanmar', 'Marc'];
    beginnerPlayerName: string[] = ['Simon', 'Jack', 'Ali'];

    constructor() {
        this.configureRouter();
    }

    private configureRouter() {
        this.router = Router();

        this.router.post('/', (req: Request, res: Response) => {
            if (req.body.category === 'advanced') this.advancedPlayername.push(req.body.name);
            else this.beginnerPlayerName.push(req.body.name);

            res.status(HTTP_STATUS_CREATED).json({ message: 'Nom enregistré !' });
        });

        this.router.put('/:id', (req: Request, res: Response) => {
            const index: number = +req.params.id;
            if (req.body.category === 'advanced') this.advancedPlayername[index] = req.body.newName;
            else this.beginnerPlayerName[index] = req.body.newName;

            res.status(HHTP_SUCCESSFUL_REQUEST).json({ message: 'Element modifié !' });
        });

        this.router.delete('/:id', (req: Request, res: Response) => {
            const index = this.advancedPlayername.indexOf(req.params.id, 0);
            if (index > ELEMENT_NOT_FOUNDED) {
                this.advancedPlayername.splice(index, 1);
            } else this.beginnerPlayerName.splice(index, 1);

            res.status(HHTP_SUCCESSFUL_REQUEST).json({ message: 'Element supprimé !' });
        });

        this.router.get('/advanced', async (req: Request, res: Response) => {
            res.json(this.advancedPlayername);
        });

        this.router.get('/beginner', async (req: Request, res: Response) => {
            res.json(this.advancedPlayername);
        });
    }
}
