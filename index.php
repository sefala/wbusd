<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">

	<link rel="stylesheet" href="styles.css">
	<title></title>
</head>

<body>
	<div class="headContainer">

		<button class="boton" id="button1">Conectar</button>

		<h4 class="headItems">Cuenta conectada </h4>
		<p class="headItems" id="add">No conectada</p>
		<h4 class="headItems">Red</h4>
		<p class="headItems" id="red">No conectada</p>
		<h4 class="headItems">Balance</h4>
		<p class="headItems" id="bal"></p>

	</div>

	<div class="vaults">
		<div class="vault" style="display: none;" id="BSC">
			<h4>Pending Reward BUSD/UST (BSC)</h4>
			<p id="pendRew"></p>
			<h4>Last Compound</h4>
			<p id="lastHarvest"></p>
			<p id="horas"></p>
		</div>
		<div class="vault">
			<h4>WBUSD en Polygon / Fantom</h4>
			<p id="wbusdPoly"></p>
			<h4>Colateral en BUSD</h4>
			<p id="ColBusd"></p>
		</div>
	</div>




	<script src="https://unpkg.com/@metamask/detect-provider/dist/detect-provider.min.js"></script>
	<script src="https://unpkg.com/web3@latest/dist/web3.min.js"></script>
	<script src="zeroStratAbi.js"></script>
	<script src="tokenAbi.js"></script>
	<script src="codigo.js" type="module"></script>

</body>

</html>