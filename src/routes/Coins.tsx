import { useQuery } from "react-query";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api"
import { Helmet } from "react-helmet-async";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import { useForm } from "react-hook-form";


const Title = styled.h1`
    color: ${props => props.theme.accentColor};
    font-size : 48px;
`;

const Container = styled.div`
    display:block;
    padding:0 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 15vh;
    display:flex;
    justify-content: center;
    align-items: center;    
`;

const CoinsList = styled.ul`
    display:block;
`;

const Coin = styled.li`
    display:block;
    background-color: white;
    color: ${props => props.theme.bgColor};
    border-radius: 15px;    
    margin-bottom: 10px;
    a{
        padding:20px;
        transition: color 0.3s ease-in;
        display: flex;
        align-items: center;
    }
    img{
        margin-right: 10px;
    }
    &:hover{
        a{color: ${props=> props.theme.accentColor};}

    }
`;

const Loder = styled.span`
    display: block;
    text-align: center;
`;

const Img = styled.img`
    width:34px;
    height:34px;
`;

interface ICoin {
    id: string, 
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    token: string,
}



function Coins(){
    const {isLoading, data} = useQuery<ICoin[]>("allCoins",fetchCoins);



    
    const chkTheme = useRecoilValue(isDarkAtom);
    const [theme, setTheme] = useRecoilState(isDarkAtom);

    const setThemeChange = () => {
        setTheme((current:any)=> !current);
    }
    useEffect(()=>{
        JSON.stringify(localStorage.setItem("theme",chkTheme))
    },[chkTheme])
    
    

    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loding, SetLoding] = useState(true);
    // const getApi = async () => {
    //     const res = await fetch("https://api.coinpaprika.com/v1/coins");
    //     const json = await res.json();        
    //     setCoins(json.slice(0,100));
    //     SetLoding(false);
    // }
    // useEffect(()=> {
    //     getApi();
    // },[])
    return ( 
        <div>        
            <Container> 
                <Helmet>
                    <title>코인</title>
                </Helmet>
                 
               
                <Header>
                    <Title>코인</Title>
                    <button onClick={setThemeChange}>테마 변경</button>
                </Header>
                {
                    isLoading ? (
                        <Loder>loding...</Loder>
                    ) : (
                    <CoinsList>
                        {
                            data?.slice(0,100).map(item => 
                                <Coin key={item.id}>                                
                                    <Link to={{
                                        pathname : `${item.id}`,
                                        state : {
                                            name : `${item.name}`
                                        }
                                    }}>
                                        <Img src={`https://coinicons-api.vercel.app/api/icon/${item.symbol.toLowerCase()}`}></Img>                                                 
                                        {item.name} &rarr;
                                    </Link>
                                </Coin>
                            )
                        }
                    </CoinsList>
                    )
                }
            </Container>
        </div>
    );
}


export default Coins;
