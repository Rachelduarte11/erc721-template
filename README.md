# ERC721 Template

Plantilla base para contratos inteligentes ERC-721 (NFTs) en Solidity, lista para personalización y despliegue.

## Requisitos Previos

- Node.js (versión 18.x o superior)
- npm (incluido con Node.js)
- Una wallet con ETH para pruebas (Sepolia o Mainnet)

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Rachelduarte11/erc721-template.git
cd erc721-template
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
PRIVATE_KEY=tu_clave_privada
SEPOLIA_RPC_URL=tu_url_rpc_sepolia
MAINNET_RPC_URL=tu_url_rpc_mainnet
ETHERSCAN_API_KEY=tu_api_key_etherscan
```

## Desarrollo

### Compilación

Para compilar los contratos:
```bash
npm run compile
```

### Pruebas

Para ejecutar las pruebas:
```bash
npm test
```

## Despliegue

### Red Local (Hardhat)

1. Inicia una red local de Hardhat:
```bash
npx hardhat node
```

2. En una nueva terminal, despliega el contrato:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Red de Prueba (Sepolia)

Para desplegar en Sepolia:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Red Principal (Ethereum Mainnet)

Para desplegar en la red principal:
```bash
npx hardhat run scripts/deploy.js --network mainnet
```

## Verificación del Contrato

Después del despliegue, puedes verificar el contrato en Etherscan:

```bash
npx hardhat verify --network <red> <dirección_del_contrato> "Nombre de la Colección" "Símbolo" "URI Base"
```

Ejemplo para Sepolia:
```bash
npx hardhat verify --network sepolia 0x1234... "Mi Colección NFT" "MNFT" "ipfs://QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/"
```

## Estructura del Proyecto

```
├── contracts/              # Contratos inteligentes
│   ├── MyERC721Token.sol  # Contrato principal ERC721
│   └── interfaces/        # Interfaces del contrato
├── scripts/               # Scripts de despliegue
├── test/                  # Tests del contrato
└── hardhat.config.js      # Configuración de Hardhat
```

## Características del Contrato

- Implementación completa del estándar ERC721
- Soporte para metadatos off-chain (IPFS)
- Funciones de minting seguras
- Enumeración de tokens
- Control de acceso basado en roles

## Licencia

ISC
