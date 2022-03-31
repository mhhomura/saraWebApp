import styled from 'styled-components';

export const Container = styled.div`
    font-family: 'Mulish';
`;

export const BannerDiv = styled.div`
    width: 100%;
    height: 11.25rem;
    margin: auto;
    display: flex;
    justify-content: space-between;

    background: transparent linear-gradient(180deg, #5E81F4 0%, #1665D8 100%) 0% 0% no-repeat padding-box;
    border-radius: 16px;
    opacity: 1;

    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;

    padding-left: 35px;
    
    @media(max-width:1518px){
        height: 13rem;
    }`;

export const Buttons = styled.div`
    margin-top: 25px;

    font-family: 'Mulish';
`;

export const Button1 = styled.button`
    width: 200px;
    height: 35px;
    border-radius: 8px;
    background: #FFFFFF40 0% 0% no-repeat padding-box;
    color: #FFFFFF;;
    font-size: 14px;

    margin-right: 20px;

    transition: ease .3s;
                    &:hover{
                        opacity: 0.8;
                    }
`;

export const Button2 = styled.button`
    width: 150px;
    height: 35px;
    border-radius: 8px;
    background: #FFFFFF40 0% 0% no-repeat padding-box;
    color: #FFFFFF;;
    font-size: 14px;

    transition: ease .3s;
                    &:hover{
                        opacity: 0.8;
                    }
`;

export const LeftDiv = styled.div`
    width: 60%;
    padding-top: 20px;

    > h5 {
        font-weight: 600;
    }
`;

export const RightDiv = styled.div`
    width: 40%;
    display: flex;
    align-items: right;
    justify-content: flex-end;
    padding-right: 35px;
`;