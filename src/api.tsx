
const BASE_URL = `https://api.coinpaprika.com/v1`;


export async function fetchCoins(){
    const res = await fetch(`${BASE_URL}/coins`);
    const json = await res.json();
    return json;
}


export async function fetchCoinInfo(coinId:string){
    const res = await fetch(`${BASE_URL}/coins/${coinId}`);
    const json = await res.json();
    return json;
}

export async function fetchCoinTickers(coinId:string){
    const res = await fetch(`${BASE_URL}/tickers/${coinId}`);
    const json = await res.json();
    return json;
}


export async function fetchChartCoin(coinId:string){
    const res = await fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`)
    const json = await res.json();
    return json;
}




