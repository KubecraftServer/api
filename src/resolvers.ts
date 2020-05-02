import { Rcon } from "rcon-client"

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//@ts-ignore
const rcon = new Rcon({ host: process.env.RCON_HOST, port: process.env.RCON_PORT, password: process.env.RCON_PASSWORD });

rcon.connect();

export interface Server {
    players: string[]
};

export interface OPArguments {
    nickname: string
}

export default {
    Query: {
        async server(): Promise<Server> {
            const players = (await rcon.send("list")).replace(/There are \d*[/]\d* players online:/g, "").split(" ").filter((player: string) => {
                return player.length > 0;
            })
            return { players };
        }
    },
    Mutation: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async op(_: any, args: OPArguments): Promise<string> {
            const result = await rcon.send(`op ${args.nickname}`);
            return result;
        }
    }
};