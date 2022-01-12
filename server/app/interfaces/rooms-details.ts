/* eslint-disable prettier/prettier */
export interface RoomsDetails {
    roomName: string;
    players: {
        creator: string;
        opponent: string;
    };
    targets?: string;
    dictionaryName: string;
}
// on a du forcer ce probleme par un disable, parecque meme en le fixant, avec un seul ctrl+s, le probleme revient
// suggestion dajout dun disable par les charges de lab pour remedier a ce probleme
