"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "quantity",
                type: "uint256",
            },
        ],
        name: "ProductAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "buyer",
                type: "address",
            },
        ],
        name: "ProductBought",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "ProductRefund",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "quantity",
                type: "uint256",
            },
        ],
        name: "ProductUpdated",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "uint16",
                name: "quantity",
                type: "uint16",
            },
        ],
        name: "addProduct",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "buyProduct",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getAllProducts",
        outputs: [
            {
                components: [
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "uint16",
                        name: "quantity",
                        type: "uint16",
                    },
                ],
                internalType: "struct StoreBase.Product[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "getProductBuyersById",
        outputs: [
            {
                internalType: "address[]",
                name: "",
                type: "address[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "getProductById",
        outputs: [
            {
                components: [
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "uint16",
                        name: "quantity",
                        type: "uint16",
                    },
                ],
                internalType: "struct StoreBase.Product",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
        ],
        name: "getProductByName",
        outputs: [
            {
                components: [
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "uint16",
                        name: "quantity",
                        type: "uint16",
                    },
                ],
                internalType: "struct StoreBase.Product",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getRefundPolicyNumber",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "products",
        outputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "uint16",
                name: "quantity",
                type: "uint16",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "refundProduct",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "blockNumber",
                type: "uint8",
            },
        ],
        name: "setRefundPolicyNumber",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "uint16",
                name: "quantity",
                type: "uint16",
            },
        ],
        name: "updateProductQuantity",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60806040526064600060146101000a81548160ff021916908360ff16021790555034801561002c57600080fd5b5033600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036100a05760006040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161009791906101ba565b60405180910390fd5b6100af816100b560201b60201c565b506101d5565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006101a482610179565b9050919050565b6101b481610199565b82525050565b60006020820190506101cf60008301846101ab565b92915050565b6124e0806101e46000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80638642269e1161008c578063d4290f8311610066578063d4290f8314610224578063ea25877214610254578063f2fde38b14610284578063fb8fc184146102a0576100ea565b80638642269e146101ce5780638da5cb5b146101ea578063c750fc5414610208576100ea565b80636a1d1959116100c85780636a1d195914610159578063715018a6146101775780637274d680146101815780637acc0b201461019d576100ea565b806302ee3a52146100ef5780633f70c2b41461010d57806343b726481461013d575b600080fd5b6100f76102bc565b6040516101049190611654565b60405180910390f35b610127600480360381019061012291906116c0565b6103cd565b604051610134919061172a565b60405180910390f35b610157600480360381019061015291906118ad565b61050c565b005b6101616106dd565b60405161016e9190611925565b60405180910390f35b61017f6106f3565b005b61019b600480360381019061019691906116c0565b610707565b005b6101b760048036038101906101b291906116c0565b6107c3565b6040516101c5929190611999565b60405180910390f35b6101e860048036038101906101e391906116c0565b61088d565b005b6101f2610a54565b6040516101ff9190611a0a565b60405180910390f35b610222600480360381019061021d9190611a25565b610a7d565b005b61023e60048036038101906102399190611a65565b610b55565b60405161024b919061172a565b60405180910390f35b61026e600480360381019061026991906116c0565b610d25565b60405161027b9190611b6c565b60405180910390f35b61029e60048036038101906102999190611bba565b610e11565b005b6102ba60048036038101906102b59190611c13565b610e97565b005b60606001805480602002602001604051908101604052809291908181526020016000905b828210156103c4578382906000526020600020906002020160405180604001604052908160008201805461031390611c6f565b80601f016020809104026020016040519081016040528092919081815260200182805461033f90611c6f565b801561038c5780601f106103615761010080835404028352916020019161038c565b820191906000526020600020905b81548152906001019060200180831161036f57829003601f168201915b505050505081526020016001820160009054906101000a900461ffff1661ffff1661ffff1681525050815260200190600101906102e0565b50505050905090565b6103d561148a565b8160018054905080821061041e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161041590611cec565b60405180910390fd5b60006001858154811061043457610433611d0c565b5b906000526020600020906002020190508060405180604001604052908160008201805461046090611c6f565b80601f016020809104026020016040519081016040528092919081815260200182805461048c90611c6f565b80156104d95780601f106104ae576101008083540402835291602001916104d9565b820191906000526020600020905b8154815290600101906020018083116104bc57829003601f168201915b505050505081526020016001820160009054906101000a900461ffff1661ffff1661ffff16815250509350505050919050565b610514610ebd565b8060008161ffff161161055c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161055390611d87565b60405180910390fd5b8260008151036105a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161059890611df3565b60405180910390fd5b6000806003866040516105b49190611e4f565b908152602001604051809103902060000180546105d090611c6f565b90501190506000600260006105e488610f44565b815260200190815260200160002054905081156106815760006001828154811061061157610610611d0c565b5b9060005260206000209060020201905061062b8287610f74565b7ff9b1d9170fbe32752353e00d62e5276b143166c75aa974030dddfac2895601fe82826000018360010160009054906101000a900461ffff1660405161067393929190611f49565b60405180910390a1506106d5565b60018054905090506106996001805490508787610fb8565b7fcca07c742c5274e8b72111ba69566aa4442450bfc50bd897ea38d0170d1accfc8187876040516106cc93929190611f87565b60405180910390a15b505050505050565b60008060149054906101000a900460ff16905090565b6106fb610ebd565b61070560006110c3565b565b80600180549050808210610750576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161074790611cec565b60405180910390fd5b600033905061075f8482611187565b60006001858154811061077557610774611d0c565b5b906000526020600020906002020190507f21b68a0c4ac2beb4bede4a50169cdeeeaff19097e416463da0524864702ffe44856040516107b49190611fc5565b60405180910390a15050505050565b600181815481106107d357600080fd5b90600052602060002090600202016000915090508060000180546107f690611c6f565b80601f016020809104026020016040519081016040528092919081815260200182805461082290611c6f565b801561086f5780601f106108445761010080835404028352916020019161086f565b820191906000526020600020905b81548152906001019060200180831161085257829003601f168201915b5050505050908060010160009054906101000a900461ffff16905082565b600181815481106108a1576108a0611d0c565b5b906000526020600020906002020160010160009054906101000a900461ffff1660008161ffff1611610908576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108ff90611d87565b60405180910390fd5b81600180549050808210610951576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161094890611cec565b60405180910390fd5b600033905060006001868154811061096c5761096b611d0c565b5b9060005260206000209060020201905060006109888784611318565b905080156109cb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109c290612052565b60405180910390fd5b6109d58784611375565b81600101600081819054906101000a900461ffff16809291906109f7906120a1565b91906101000a81548161ffff021916908361ffff160217905550507f60751e87ab3312710ec7d4da85ea804d0813ca2cb843a75cc23c672e1bd3954a8784604051610a439291906120ca565b60405180910390a150505050505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610a85610ebd565b81600180549050808210610ace576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ac590611cec565b60405180910390fd5b610ad88484610f74565b600060018581548110610aee57610aed611d0c565b5b906000526020600020906002020190507ff9b1d9170fbe32752353e00d62e5276b143166c75aa974030dddfac2895601fe85826000018360010160009054906101000a900461ffff16604051610b4693929190611f49565b60405180910390a15050505050565b610b5d61148a565b816000815103610ba2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b9990611df3565b60405180910390fd5b600080600385604051610bb59190611e4f565b90815260200160405180910390206000018054610bd190611c6f565b905011905080610c16576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c0d90611cec565b60405180910390fd5b600060026000610c2587610f44565b8152602001908152602001600020549050600060018281548110610c4c57610c4b611d0c565b5b9060005260206000209060020201905080604051806040016040529081600082018054610c7890611c6f565b80601f0160208091040260200160405190810160405280929190818152602001828054610ca490611c6f565b8015610cf15780601f10610cc657610100808354040283529160200191610cf1565b820191906000526020600020905b815481529060010190602001808311610cd457829003601f168201915b505050505081526020016001820160009054906101000a900461ffff1661ffff1661ffff1681525050945050505050919050565b606081600180549050808210610d70576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d6790611cec565b60405180910390fd5b60056000858152602001908152602001600020805480602002602001604051908101604052809291908181526020018280548015610e0357602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610db9575b505050505092505050919050565b610e19610ebd565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610e8b5760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610e829190611a0a565b60405180910390fd5b610e94816110c3565b50565b610e9f610ebd565b80600060146101000a81548160ff021916908360ff16021790555050565b610ec5611448565b73ffffffffffffffffffffffffffffffffffffffff16610ee3610a54565b73ffffffffffffffffffffffffffffffffffffffff1614610f4257610f06611448565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401610f399190611a0a565b60405180910390fd5b565b600081604051602001610f579190611e4f565b604051602081830303815290604052805190602001209050919050565b8060018381548110610f8957610f88611d0c565b5b906000526020600020906002020160010160006101000a81548161ffff021916908361ffff1602179055505050565b600060405180604001604052808481526020018361ffff1681525090506000610fe084610f44565b90508460026000838152602001908152602001600020819055506001829080600181540180825580915050600190039060005260206000209060020201600090919091909150600082015181600001908161103b9190612280565b5060208201518160010160006101000a81548161ffff021916908361ffff1602179055505050816003856040516110729190611e4f565b908152602001604051809103902060008201518160000190816110959190612280565b5060208201518160010160006101000a81548161ffff021916908361ffff1602179055509050505050505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008581526020019081526020016000205414159050600061123a600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600086815260200190815260200160002054611450565b90508061127c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611273906123c4565b60405180910390fd5b816112bc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112b390612456565b60405180910390fd5b6000600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008681526020019081526020016000208190555050505050565b600080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008581526020019081526020016000205411905092915050565b600043905080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008581526020019081526020016000208190555060056000848152602001908152602001600020829080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050565b600033905090565b600043600060149054906101000a900460ff1660ff16836114719190612476565b11156114805760019050611485565b600090505b919050565b604051806040016040528060608152602001600061ffff1681525090565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561150e5780820151818401526020810190506114f3565b60008484015250505050565b6000601f19601f8301169050919050565b6000611536826114d4565b61154081856114df565b93506115508185602086016114f0565b6115598161151a565b840191505092915050565b600061ffff82169050919050565b61157b81611564565b82525050565b6000604083016000830151848203600086015261159e828261152b565b91505060208301516115b36020860182611572565b508091505092915050565b60006115ca8383611581565b905092915050565b6000602082019050919050565b60006115ea826114a8565b6115f481856114b3565b935083602082028501611606856114c4565b8060005b85811015611642578484038952815161162385826115be565b945061162e836115d2565b925060208a0199505060018101905061160a565b50829750879550505050505092915050565b6000602082019050818103600083015261166e81846115df565b905092915050565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b61169d8161168a565b81146116a857600080fd5b50565b6000813590506116ba81611694565b92915050565b6000602082840312156116d6576116d5611680565b5b60006116e4848285016116ab565b91505092915050565b6000604083016000830151848203600086015261170a828261152b565b915050602083015161171f6020860182611572565b508091505092915050565b6000602082019050818103600083015261174481846116ed565b905092915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61178e8261151a565b810181811067ffffffffffffffff821117156117ad576117ac611756565b5b80604052505050565b60006117c0611676565b90506117cc8282611785565b919050565b600067ffffffffffffffff8211156117ec576117eb611756565b5b6117f58261151a565b9050602081019050919050565b82818337600083830152505050565b600061182461181f846117d1565b6117b6565b9050828152602081018484840111156118405761183f611751565b5b61184b848285611802565b509392505050565b600082601f8301126118685761186761174c565b5b8135611878848260208601611811565b91505092915050565b61188a81611564565b811461189557600080fd5b50565b6000813590506118a781611881565b92915050565b600080604083850312156118c4576118c3611680565b5b600083013567ffffffffffffffff8111156118e2576118e1611685565b5b6118ee85828601611853565b92505060206118ff85828601611898565b9150509250929050565b600060ff82169050919050565b61191f81611909565b82525050565b600060208201905061193a6000830184611916565b92915050565b600082825260208201905092915050565b600061195c826114d4565b6119668185611940565b93506119768185602086016114f0565b61197f8161151a565b840191505092915050565b61199381611564565b82525050565b600060408201905081810360008301526119b38185611951565b90506119c2602083018461198a565b9392505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006119f4826119c9565b9050919050565b611a04816119e9565b82525050565b6000602082019050611a1f60008301846119fb565b92915050565b60008060408385031215611a3c57611a3b611680565b5b6000611a4a858286016116ab565b9250506020611a5b85828601611898565b9150509250929050565b600060208284031215611a7b57611a7a611680565b5b600082013567ffffffffffffffff811115611a9957611a98611685565b5b611aa584828501611853565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b611ae3816119e9565b82525050565b6000611af58383611ada565b60208301905092915050565b6000602082019050919050565b6000611b1982611aae565b611b238185611ab9565b9350611b2e83611aca565b8060005b83811015611b5f578151611b468882611ae9565b9750611b5183611b01565b925050600181019050611b32565b5085935050505092915050565b60006020820190508181036000830152611b868184611b0e565b905092915050565b611b97816119e9565b8114611ba257600080fd5b50565b600081359050611bb481611b8e565b92915050565b600060208284031215611bd057611bcf611680565b5b6000611bde84828501611ba5565b91505092915050565b611bf081611909565b8114611bfb57600080fd5b50565b600081359050611c0d81611be7565b92915050565b600060208284031215611c2957611c28611680565b5b6000611c3784828501611bfe565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611c8757607f821691505b602082108103611c9a57611c99611c40565b5b50919050565b7f546869732070726f6475637420646f6573206e6f742065786973742100000000600082015250565b6000611cd6601c83611940565b9150611ce182611ca0565b602082019050919050565b60006020820190508181036000830152611d0581611cc9565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f5175616e746974792063616e2774206265203021000000000000000000000000600082015250565b6000611d71601483611940565b9150611d7c82611d3b565b602082019050919050565b60006020820190508181036000830152611da081611d64565b9050919050565b7f596f75206861766520746f20656e7465722061206e616d652100000000000000600082015250565b6000611ddd601983611940565b9150611de882611da7565b602082019050919050565b60006020820190508181036000830152611e0c81611dd0565b9050919050565b600081905092915050565b6000611e29826114d4565b611e338185611e13565b9350611e438185602086016114f0565b80840191505092915050565b6000611e5b8284611e1e565b915081905092915050565b611e6f8161168a565b82525050565b60008190508160005260206000209050919050565b60008154611e9781611c6f565b611ea18186611940565b94506001821660008114611ebc5760018114611ed257611f05565b60ff198316865281151560200286019350611f05565b611edb85611e75565b60005b83811015611efd57815481890152600182019150602081019050611ede565b808801955050505b50505092915050565b6000819050919050565b6000611f33611f2e611f2984611564565b611f0e565b61168a565b9050919050565b611f4381611f18565b82525050565b6000606082019050611f5e6000830186611e66565b8181036020830152611f708185611e8a565b9050611f7f6040830184611f3a565b949350505050565b6000606082019050611f9c6000830186611e66565b8181036020830152611fae8185611951565b9050611fbd6040830184611f3a565b949350505050565b6000602082019050611fda6000830184611e66565b92915050565b7f596f752063616e6e6f7420627579207468652073616d652070726f647563742060008201527f6d6f7265207468616e206f6e6365210000000000000000000000000000000000602082015250565b600061203c602f83611940565b915061204782611fe0565b604082019050919050565b6000602082019050818103600083015261206b8161202f565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006120ac82611564565b9150600082036120bf576120be612072565b5b600182039050919050565b60006040820190506120df6000830185611e66565b6120ec60208301846119fb565b9392505050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026121407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82612103565b61214a8683612103565b95508019841693508086168417925050509392505050565b600061217d6121786121738461168a565b611f0e565b61168a565b9050919050565b6000819050919050565b61219783612162565b6121ab6121a382612184565b848454612110565b825550505050565b600090565b6121c06121b3565b6121cb81848461218e565b505050565b5b818110156121ef576121e46000826121b8565b6001810190506121d1565b5050565b601f8211156122345761220581611e75565b61220e846120f3565b8101602085101561221d578190505b612231612229856120f3565b8301826121d0565b50505b505050565b600082821c905092915050565b600061225760001984600802612239565b1980831691505092915050565b60006122708383612246565b9150826002028217905092915050565b612289826114d4565b67ffffffffffffffff8111156122a2576122a1611756565b5b6122ac8254611c6f565b6122b78282856121f3565b600060209050601f8311600181146122ea57600084156122d8578287015190505b6122e28582612264565b86555061234a565b601f1984166122f886611e75565b60005b82811015612320578489015182556001820191506020850194506020810190506122fb565b8683101561233d5784890151612339601f891682612246565b8355505b6001600288020188555050505b505050505050565b7f536f7272792c20796f7572207265717565737420666f7220726566756e64206860008201527f6173206265656e2064656e6965642e0000000000000000000000000000000000602082015250565b60006123ae602f83611940565b91506123b982612352565b604082019050919050565b600060208201905081810360008301526123dd816123a1565b9050919050565b7f596f7527766520616c72656164792072657475726e656420796f75722070726f60008201527f64756374206f72206469646e2774206576656e20626f756768742069742e0000602082015250565b6000612440603e83611940565b915061244b826123e4565b604082019050919050565b6000602082019050818103600083015261246f81612433565b9050919050565b60006124818261168a565b915061248c8361168a565b92508282019050808211156124a4576124a3612072565b5b9291505056fea26469706673582212200fcdf1152dc63aaa1393b53c623db1a51dd070b3eaca4838e7e0690cf6b4319964736f6c634300081c0033";
const isSuperArgs = (xs) => xs.length > 1;
class Store__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    connect(runner) {
        return super.connect(runner);
    }
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.Store__factory = Store__factory;
Store__factory.bytecode = _bytecode;
Store__factory.abi = _abi;
