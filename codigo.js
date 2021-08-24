const web3 = new Web3;
const bsc = new Web3;
const polygon = new Web3;
const fantom = new Web3;
bsc.setProvider("https://bsc-dataseed.binance.org/")
polygon.setProvider("https://rpc-mainnet.maticvigil.com/")
fantom.setProvider("https://rpcapi.fantom.network")
let chainId;

window.onload = async () => {

  const provider = await detectEthereumProvider()

  if (provider) {
    provider.on('chainChanged', () => location.reload())
    provider.on('accountsChanged', () => location.reload())
    provider.on('disconnect', () => location.reload())

    await provider.request({ method: 'eth_requestAccounts' })

    web3.setProvider(provider)

    chainId = await web3.eth.getChainId()

    switch (chainId) {
      case 1:
        chainId = 'Ethereum Mainnet'
        break
      case 56:
        chainId = 'Binance Smart Chain'
        break
      case 97:
        chainId = 'Binance Smart Chain (Testnet)'
        break
      case 250:
        chainId = 'Fantom Opera'
        break
      case 137:
        chainId = 'Polygon'
        break
      default:
        chainId = 'Alguna red'
    }

    document.getElementById("red").textContent = chainId;

    conectado()

  } else {
    console.error('Web3 provider not detected')
    //alert("Metamask no detectado, use un navegador dapp para ver más información")
  }
}





const conectado = async () => {

  let tuCuenta = await web3.eth.getAccounts();
  document.getElementById("add").textContent = `${String(tuCuenta).substring(1, 5)}...${String(tuCuenta).substring(38)} `;
  let tuBalance = await web3.eth.getBalance(tuCuenta[0]);
  tuBalance = Number(web3.utils.fromWei(tuBalance)).toFixed(3);
  document.getElementById("bal").textContent = tuBalance;

  if (chainId == 'Binance Smart Chain') {

  }
}

const vaults = async () => {

}



const wbusdStats = async () => {
  const wbusdPolygon = await new polygon.eth.Contract(window.tokenAbi, "0x87ff96aba480f1813aF5c780387d8De7cf7D8261")
  const wbusdFtm = await new fantom.eth.Contract(window.tokenAbi, "0xB49C1609e70D25B945d80989632C24df96353980")

  let balancePoly = await wbusdPolygon.methods.totalSupply().call()
  balancePoly = Number(polygon.utils.fromWei(balancePoly)).toFixed(1);
  balancePoly = new Intl.NumberFormat().format(balancePoly);

  let balanceFtm = await wbusdFtm.methods.totalSupply().call()
  balanceFtm = Number(fantom.utils.fromWei(balanceFtm)).toFixed(1);
  balanceFtm = new Intl.NumberFormat().format(balanceFtm);

  document.getElementById("wbusdPoly").textContent = `$ ${balancePoly}  /  $ ${balanceFtm}`;

  const busdContract = await new bsc.eth.Contract(window.tokenAbi, "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56")
  const collContract = "0x32e8E9095E05B4203Fe9B23284144f89766e634A"

  let collateral = await busdContract.methods.balanceOf(collContract).call();
  collateral = Number(bsc.utils.fromWei(collateral)).toFixed(1);
  collateral = new Intl.NumberFormat().format(collateral);
  let porcent = parseFloat(collateral) / ((parseFloat(balancePoly) + parseFloat(balanceFtm))) * 100;
  porcent = porcent.toFixed(2);
  document.getElementById("ColBusd").textContent = `$ ${collateral} - ${porcent}  %`;




  const zeroStratContract = await new bsc.eth.Contract(window.abi1, "0xaafAb69eC1984c43dE9720F20743033B04E09aFA");
  let pendingReward = await zeroStratContract.methods.calculateTotalPendingCakeRewards().call();

  let pendingHumano = bsc.utils.fromWei(pendingReward);

  document.getElementById("pendRew").textContent = pendingHumano;


  let lastHarvest = await zeroStratContract.methods.lastHarvestedTime().call();
  let horaHarvest = lastHarvest * 1000;
  horaHarvest = new Date(horaHarvest);
  //document.getElementById("lastHarvest").innerText = horaHarvest;

  let hora = Date.now()
  let tiempo = hora - lastHarvest * 1000
  tiempo = (((tiempo / 3600000)).toFixed(1))
  document.getElementById("horas").innerText = tiempo + " horas";

  document.getElementById("BSC").style.display = "inline-block";


  const zeroStratContractApe = await new bsc.eth.Contract(window.abi1, "0x030d358E5d126A46256748829Ab0A488b45B31c8");
  let lastHarvestApe = await zeroStratContractApe.methods.lastHarvestedTime().call();
  let horaHarvestApe = lastHarvestApe * 1000;
  horaHarvestApe = new Date(horaHarvestApe);

  let tiempoApe = hora - lastHarvestApe * 1000
  tiempoApe = (((tiempoApe / 3600000)).toFixed(1))
}

let refrescar = setInterval(wbusdStats, 30000);


/*

const onClickConnect = async () => {
  try {
    await ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    console.error(error);
  }
};

document.getElementById("button1").onclick = onClickConnect





const mint = async () => {

  let cuenta = await web3.eth.getAccounts();

  const tokenContract = await new web3.eth.Contract(window.tokenAbi, "0x38B1Be51a2ee443006f4F8799c23E59De0ED8C6d");
  await tokenContract.methods.mint(cuenta[0], BigInt(1e22)).send({ from: cuenta[0] });

}

*/






