/* eslint-disable @typescript-eslint/no-magic-numbers */
import { TestBed } from '@angular/core/testing';
// import { Server, SocketIO } from 'mock-socket';
// import * as io from 'socket.io';
import { MultiplayerService } from './multiplayer.service';

describe('MultiplayerService', () => {
    let service: MultiplayerService;
    // // let sio: io.Server;
    // // let socket;
    beforeEach(() => {
        service = new MultiplayerService();
        TestBed.configureTestingModule({});
        service = TestBed.inject(MultiplayerService);
        // service.socket = io(uri);
        // const uri = 'ws://localhost:3000';
        // sio = io(uri);
    });
    // it('should be created', () => {
    //     expect(service).toBeTruthy();
    // });
    /// /////////////////////////////////////  joinRoom ////////////////////////
    // it('should be created', () => {
    //     const room = 'room';
    //     const creator = 'aldric';
    //     socket = new Socket(service.joinRoom(), { room, creator });
    //     service.joinRoom(room, creator);
    //     expect(socket.emit('createRoom', { room, creator })).toHaveBeenCalled();
    // });
    /// /////////////////////////////////  createRoom ////////////////////////
    //     it('should return valid data', async () => {
    //         let fakeDb1 = {
    //             getData: () => { return {}; }
    //         }
    //         let fakeDb2 = {
    //             getData: () => { return {}; }
    //         }
    //         let service = new Service(fakeDb1, fakeDb2);
    //         let res = await service.problemFunc({...});
    //         expect(res).to.equal(...);
    //    });
    it('should be created', async () => {
        service.createRoom('room', 'manal', 'rools', 'manal');
        expect(service).toBeTruthy();
    });
    it('should call emit with createRoom', () => {
        const socketEmit = spyOn(service.socket, 'emit');
        service.createRoom('testRoom', 'testCreator', 'testDict', 'log2990');
        expect(socketEmit).toHaveBeenCalledWith('createRoom', {
            room: 'testRoom',
            creator: 'testCreator',
            dictName: 'testDict',
            gameRules: 'log2990',
        });
    });
    it('should call emit with endGame', () => {
        const socketEmit = spyOn(service.socket, 'emit');
        const room = 'testroom';
        service.endGame(room);
        expect(socketEmit).toHaveBeenCalledWith('endGame', room);
    });
    it('should call emit with updateTargerCompletion', () => {
        const socketEmit = spyOn(service.socket, 'emit');
        service.updateTargetCompletion('testRoom', 'testplayerName', 1);
        const event = { room: 'testRoom', playerName: 'testplayerName', targetId: 1 };
        expect(socketEmit).toHaveBeenCalledWith('updateTarget', event);
    });
    it('should call emit with setTargets', () => {
        const socketEmit = spyOn(service.socket, 'emit');
        const fakeId = [1, 2, 3];
        service.setTargets('testRoom', fakeId);
        const event = { room: 'testRoom', targetsIds: fakeId };
        expect(socketEmit).toHaveBeenCalledWith('setTargets', event);
    });
    it('should call emit with sendScore', () => {
        const socketEmit = spyOn(service.socket, 'emit');
        service.sendScore('name', 20);
        const event = { name: 'name', score: 20 };
        expect(socketEmit).toHaveBeenCalledWith('sendScore', event);
    });
    it('should call emit with SkipTurn', () => {
        const socketEmit = spyOn(service.socket, 'emit');
        service.skipTurn('testRoom', 'player1test');
        const event = { room: 'testRoom', name: 'player1test' };
        expect(socketEmit).toHaveBeenCalledWith('skipTurn', event);
    });
    it('should call emit with broadcastLetterLength', () => {
        const socketEmit = spyOn(service.socket, 'emit');
        service.broadcastLetterLength('testRoom', 3);
        const event = { room: 'testRoom', num: '3' };
        expect(socketEmit).toHaveBeenCalledWith('broadcastLetterLength', event);
    });
    it('should call emit with sendMessage', () => {
        const socketEmit = spyOn(service.socket, 'emit');
        service.sendMessage('testRoom', 'testPlayerName', 'testMessage');
        const event = { room: 'testRoom', name: 'testPlayerName', message: 'testMessage' };
        expect(socketEmit).toHaveBeenCalledWith('sendMessage', event);
    });
    it('should call emit with validateWord', () => {
        const socketEmit = spyOn(service.socket, 'emit');
        service.validateWord('riz', 'testRoom');
        const event = { word: 'riz', room: 'testRoom' };
        expect(socketEmit).toHaveBeenCalledWith('validationWord', event);
    });
    it('should call emit with broadcastCommand', () => {
        const socketEmit = spyOn(service.socket, 'emit');
        service.broadcastCommand('testRoom', 'testCommand');
        const event = { room: 'testRoom', command: 'testCommand' };
        expect(socketEmit).toHaveBeenCalledWith('broadcastCommand', event);
    });
    // const fakeURL = 'ws://localhost:8080';
    // const mockServer = new Server(fakeURL);
    // const mockMultiplayerService = new MultiplayerService();
    // window.io = SocketIO;
    // mockServer.on('connection', (socket) => {
    //     socket.on('sendMessage', (data) => {
    //         socket.emit('sendMessage', data);
    //     });
    // });
});
