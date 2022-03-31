import styled from 'styled-components';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const Container = styled.div`
    height: 150px;
    display: flex;
    text-decoration: none;

    .tag{
        text-decoration: none;
    }

    .divider {
            background-color: black;
            margin-right: 20px;
            opacity: 0.2;
            margin-left: 20px;
            margin-bottom: 20px;
        }
    
`;
export const Card = styled.li`
    background: #FFFFFF 0% 0% no-repeat padding-box;
    height: 280px;
    width: 100%;
    box-shadow: 0px 3px 4px #0000001F;
    border-radius: 5px;
    opacity: 1;
    list-style: none;
    cursor: pointer;
    transition: all .3s;
     &:hover{
         opacity: 0.8;
         transform: translateY(10px);
     }
    
    ::-webkit-scrollbar{
        width: 10px;
    }
    ::-webkit-scrollbar-thumb{
        background: linear-gradient(45deg, #0294FF 30%, #0AFFF7  90%);
        border-radius: 10px;
    }
    ::-webkit-scrollbar-track{
        background-color: ${props => props.theme.color.primary};
        border-radius: 10px;
    }
`;
export const Div21 = styled.div`
    width: 100%;
`;
export const Title = styled.div`
    background: #FDFDFD 0% 0% no-repeat padding-box;
    align-items: center;
    text-align: center;
    padding: 10px;
    border-bottom: 1px solid #E9EDF2;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    > h2{
        text-align: left;
        font: normal normal bold 16px/16px Mulish;
        letter-spacing: 0px;
        color: #0080FC;
        opacity: 1;
    }
`;
export const Graphic = styled.div`
    padding-top: 10px;
    align-items:center;
    text-align: center;
    height: 80%;
    width: 100%;
   
`;

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            paddingRight: '50px',
        },
        root: {
            flexGrow: 1,
            backgroundColor: '##FFFFFF',
        },
        TabPanelStyle: {
            /* backgroundColor: '#E9EDF2' */
        },
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
    height: 32rem;
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

export const BtnAdd = styled.div`
    .addButton {
        width: 150px;

        .addIcon{
            padding-right: 5px;
        }
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

