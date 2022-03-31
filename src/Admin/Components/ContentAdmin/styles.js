import styled from 'styled-components';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Modal } from 'reactstrap';

export const Container = styled.div`
    background-color: #FFFFFF;
    margin-top: 5vh;
    height: 40rem;

    box-shadow: 0px 1px 1px #00000029;
    border-radius: 6px;
    opacity: 1;

    .divider {
            background-color: black;
            margin-right: 20px;
            opacity: 0.2;
            margin-left: 20px;
            margin-bottom: 20px;
        }

        @media(max-width: 1500px){
            height: 32rem;
        }
    
`;

export const AddModal = styled(Modal)`
    .modal-content {
        background: #F3F7FF 0% 0% no-repeat padding-box;
        box-shadow: 0px 14px 32px #00000040;
        border-radius: 10px;
        border: 0;

        font-family: 'Mulish';
        font-weight: bold;
        color: #434343;
    }
    
    .modal-title {
        font-size: 18px;
        font-weight: bold;

        margin-top: 0.625rem;
    }

    .modal-header{
        border-bottom: 0;
    }

    .modal-footer{
        border-top: 0;
    }

    .modal-body{
        margin-top: -30px;
    }
`;

export const useStyles = makeStyles(() =>
    createStyles({
        AppBarStyle: {
            backgroundColor: '#FFFFFF',
            textAlign: 'left',
            alignItems: 'left',
            paddingLeft: '20px',
            paddingTop: '20px',
            color: 'black',
            boxShadow: '0 0px 0px 0px',
            borderRadius: '6px',
        },

        TabPanelStyle: {
            paddingTop: '0',
        },

        TabFont: {
            fontFamily: 'Mulish',
            color: '#434343'
        },

        SelectedTab: {
            "& .Mui-selected": {
                color: '#0080FC',
                fontWeight: 'bold',
            }
        }
    }),
);

export const TabArea = styled.div`
    height: 34.2rem;
    overflow-y: auto;

    //Scrollbar da listagem de cards
        ::-webkit-scrollbar {
            width: 8px;
        }

        ::-webkit-scrollbar-track {
            padding-right: 10px;
        }

        ::-webkit-scrollbar-thumb {
            background-color: #E3E3E3;
            border-radius: 5px;
        }
    
`;

export const SearchAddButtons = styled.div`
    display: flex;
    margin-right: 20px;

    @media(max-width: 900px){
        padding-top: 15px;
        margin-right: 10px;
    }
`;

export const SearchInput = styled.div`
    width: 12%;
    margin-left: auto;
    margin-right: 10px;

    .input-group{
        .input-group-text{
            background-color: #FFFFFF;
            border-right: 0;
        }

        .form-control{
            border-left: 0;
        }
    }

    @media(max-width: 900px){
        width: 50%;
        margin-left: 10px;
    }
`;

export const BtnAdd = styled.div`
    .addButton {
        width: 150px;

        .addIcon{
            padding-right: 5px;
        }
    }
`;

export const Form = styled.div`
    font-family: 'Mulish';
    font-weight: 700;
    color: #6E6E6E;

    .nameInput {
        border: 2px solid #D0DAED;
        border-radius: 3px;
    }

    .selector {
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 1px solid #D0DAED;
        border-radius: 3px;
        opacity: 1; 
        width: 100%;

        padding-left: 20px;

        overflow-y: auto;
        overflow-x: hidden;
        max-height: 8rem;

        .MuiTypography-root{
            font-family: 'Mulish';
            font-size: 15px;
            font-weight: 600;
        }

        .MuiFormControlLabel-root{
            width: fit-content;
        }

        //Scrollbar da seleção de setor
        ::-webkit-scrollbar {
            width: 8px;
        }

        ::-webkit-scrollbar-track {
            padding-right: 10px;
        }

        ::-webkit-scrollbar-thumb {
            background-color: #E3E3E3;
            border-radius: 5px;
        }
    }

`;

export const Label = styled.div`
    padding-top: 15px;
    padding-bottom: 5px;
`;