import React, { useState } from "react";
import { connect } from "./utilities/api/http";
// import { fetchInfo } from './utilities/utils'
import { getInfo } from './utilities/api/http'

function App() {
  // const [host, setHost] = useState<string>("");
  // const [cert, setCert] = useState<string>("");
  // const [macaroon, setMacaroon] = useState<string>("");

  const [host, setHost] = useState<string>("127.0.0.1:10004");
  const [cert, setCert] = useState<string>("2d2d2d2d2d424547494e2043455254494649434154452d2d2d2d2d0a4d4949434d6a434341646967417749424167495145356973456a74336f4b5135345158424f517131386a414b42676771686b6a4f50515144416a41764d5238770a485159445651514b45785a73626d5167595856306232646c626d56795958526c5a43426a5a584a304d517777436759445651514445774e69623249774868634e0a4d6a51774d6a49794d446b774f5449335768634e4d6a55774e4445344d446b774f544933576a41764d523877485159445651514b45785a73626d5167595856300a6232646c626d56795958526c5a43426a5a584a304d517777436759445651514445774e69623249775754415442676371686b6a4f5051494242676771686b6a4f0a50514d4242774e434141517a3466595a6f784b6e30422f6730527962462f533266326c744969676b6c384e4b304a7859797943476d5a66647953726c6d4f572b0a666c625149376a7753596847777a51356a686773384b6a6d56555971655666536f3448564d4948534d41344741315564447745422f77514541774943704441540a42674e56485355454444414b4267677242674546425163444154415042674e5648524d4241663845425441444151482f4d4230474131556444675157424253770a6d6b3375324c70423958774f79506f45496256357362494a4544423742674e56485245456444427967674e6962324b4343577876593246736147397a644949440a596d39696767787762327868636931754d69316962324b4346476876633351755a47396a613256794c6d6c7564475679626d467367675231626d6c34676770310a626d6c346347466a613256306767646964575a6a623235756877522f4141414268784141414141414141414141414141414141414141414268775373464141430a4d416f4743437147534d343942414d43413067414d45554349514443327234534d494a4b6d563130596333697749434e367932684b414e503356592b305442480a45453431507749675651432b52697352306a333771513264715859496e52534977387861667a384b57787077485271396c64553d0a2d2d2d2d2d454e442043455254494649434154452d2d2d2d2d0a");
  const [macaroon, setMacaroon] = useState<string>("0201036c6e640267030a10d81e5394c4ce2bae069ba1c70387473f1201301a0c0a04696e666f1204726561641a170a08696e766f69636573120472656164120577726974651a160a076d657373616765120472656164120577726974651a100a086f6666636861696e1204726561640000062084d0cfc04f53f83ecccd723f413fb4792c271cebf3c12c994e9cd7a02380f4c4");

  const [alias, setAlias] = useState<string>('')
  const [balance, setBalance] = useState<number | undefined>(undefined)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await connect(host, cert, macaroon);
    // move this to redux thunk or similar
    const { alias, balance } = await getInfo()
    setAlias(alias)
    setBalance(parseInt(balance))
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        className="lg:w-[50%] w-[80%] h-[80%] border border-black rounded-lg flex flex-col px-[5%] pt-[5%]"
        onSubmit={handleSubmit}
      >
        <label>Host</label>
        <input
          className="border border-neutral-300 rounded-lg mb-[30px]"
          onChange={(e) => setHost(e.target.value)}
          defaultValue="127.0.0.1:10004"
        ></input>
        <label>TLS Certificate</label>
        <textarea
          className="h-[200px] border border-neutral-300 rounded-lg mb-[30px]"
          onChange={(e) => setCert(e.target.value)}
          defaultValue="2d2d2d2d2d424547494e2043455254494649434154452d2d2d2d2d0a4d4949434d6a434341646967417749424167495145356973456a74336f4b5135345158424f517131386a414b42676771686b6a4f50515144416a41764d5238770a485159445651514b45785a73626d5167595856306232646c626d56795958526c5a43426a5a584a304d517777436759445651514445774e69623249774868634e0a4d6a51774d6a49794d446b774f5449335768634e4d6a55774e4445344d446b774f544933576a41764d523877485159445651514b45785a73626d5167595856300a6232646c626d56795958526c5a43426a5a584a304d517777436759445651514445774e69623249775754415442676371686b6a4f5051494242676771686b6a4f0a50514d4242774e434141517a3466595a6f784b6e30422f6730527962462f533266326c744969676b6c384e4b304a7859797943476d5a66647953726c6d4f572b0a666c625149376a7753596847777a51356a686773384b6a6d56555971655666536f3448564d4948534d41344741315564447745422f77514541774943704441540a42674e56485355454444414b4267677242674546425163444154415042674e5648524d4241663845425441444151482f4d4230474131556444675157424253770a6d6b3375324c70423958774f79506f45496256357362494a4544423742674e56485245456444427967674e6962324b4343577876593246736147397a644949440a596d39696767787762327868636931754d69316962324b4346476876633351755a47396a613256794c6d6c7564475679626d467367675231626d6c34676770310a626d6c346347466a613256306767646964575a6a623235756877522f4141414268784141414141414141414141414141414141414141414268775373464141430a4d416f4743437147534d343942414d43413067414d45554349514443327234534d494a4b6d563130596333697749434e367932684b414e503356592b305442480a45453431507749675651432b52697352306a333771513264715859496e52534977387861667a384b57787077485271396c64553d0a2d2d2d2d2d454e442043455254494649434154452d2d2d2d2d0a"
        ></textarea>
        <label>Macaroon</label>
        <input
          className="border border-neutral-300 rounded-lg mb-[30px]"
          onChange={(e) => setMacaroon(e.target.value)}
          defaultValue='0201036c6e640267030a10d81e5394c4ce2bae069ba1c70387473f1201301a0c0a04696e666f1204726561641a170a08696e766f69636573120472656164120577726974651a160a076d657373616765120472656164120577726974651a100a086f6666636861696e1204726561640000062084d0cfc04f53f83ecccd723f413fb4792c271cebf3c12c994e9cd7a02380f4c4'
        ></input>
        <button
          className="bg-orange-500 py-[5px] px-[20px] rounded-lg text-white ml-auto w-fit"
          type="submit"
        >
          Connect
        </button>
        <p>Node alias: {alias}</p>
        <p>Channel balance: {balance}</p>
      </form>
    </div>
  );
}

export default App;
