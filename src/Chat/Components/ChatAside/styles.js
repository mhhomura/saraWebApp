import styled from 'styled-components';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { HiOfficeBuilding } from 'react-icons/hi';
import Tooltip from '@material-ui/core/Tooltip';
import TabList from '@material-ui/lab/TabList';
import { components } from 'react-select';
import Tab from '@material-ui/core/Tab';
import { BiFontFamily } from 'react-icons/bi';

export const Container = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 1px 2px #00000029;
    border-radius: 6px;
    border-radius: 6px;
    opacity: 1;
    box-sizing: border-box;
    height: 85vh;
    @media(min-width: 1920px){
        height:90vh;
        
    }
    @media(max-width: 600px){
        height: 100vh;
    }
    overflow-y: hidden;
`;

export const Top = styled.div`
    display: flex;
    background: #FFFFFF;
    border-radius: 6px 6px 0px 0px;
    justify-content: space-between;
    align-items: center;
    padding: 2% 2%;
    height: 65px;
    border-bottom: 1px solid #DCE4EF;
`;
export const ButtonsArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.25rem;
    padding-left: 0.25rem;

`;
export const NavIcon = styled.div`
    cursor: pointer;
    width: 40px;
    height: 40px;
    color: #0F7BFF  ;
    &:hover{
        color: #1EA2F7 ;
    }
`;
export const Middle = styled.div`
    padding: 20px 15px;
    align-items: center;
    justify-content: center;
    background-color: #F9FAFC  ;  
    height: 123px;
    border-bottom: 1px solid #DCE4EF;
    box-shadow: 0px 1px 4px #0000001A;
    
    >p {
        letter-spacing: 0px;
        color: #6E6E6E;
        opacity: 1;
        text-align: left;
        
        font-size: 15px;
        font-weight: 600;
    }
`;

export const Search = styled.div`
    padding: 15px 15px;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    padding-bottom: 20px ;
`;

export const SearchInput = styled.div`
    background-color: #FFFFFF  ;
    height: 46px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border: 1px solid  #D0DAEDCC;
    border-radius: 3px;
    >input{
        flex:1;
        border: 0;
        outline: 0;
        background-color: transparent;
        margin-left: 10px ;
    }
`;
export const Config = styled.div`
    color: #A5B9D5 ;
    &:hover{
        color: #787878 ;
    }
`;
export const Botton = styled.div`    
`;

export const BottonContacts = styled.div`
      overflow-y: scroll;
`;

export const Definition = styled.div`
`;
export const List2 = styled.div`
   padding: 0 15px;
   display: flex;
   height: 55px;
   align-items: center;
   color: #656565 ;
   cursor: pointer;
   &:hover{
        color: #0F7BFF;
       background-color: #F8FAFD;
      
   }
`;

export const Item1 = styled.div`
   /*  color: #A5B9D5 ; */
    opacity: 1;
    padding-right: 1.5rem ;
`;
export const Item2 = styled.div`
    font-size: 1rem;
   /*  color: #656565 ;
    &:hover{
       color: #0F7BFF;
   } */
`;

export const Contacts = styled.div`
    height: 200px;
    overflow-y: hidden;
    transition: all ease 0.3s;
    background: #F7F8FA ;
`;

export const Attendents = styled.div`
    height: 200px;
    overflow-y: hidden;
    transition: all ease 0.3s;
`;

export const Archived = styled.div`
    height: 200px;
    overflow-y: hidden;
    transition: all ease 0.3s;
`;

export const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "#F3F7FF",
        color: '#505050',
        boxShadow: theme.shadows[1],
        fontSize: '.9rem',
    },
}))(Tooltip);

export const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
        borderBottom: "1px solid #DCE4EF",
        color: "#434343",
        fontSize: "1rem"
    },
    popover: {
        borderRadius: "6px",
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
    TabPanelStyle: {
        height: '100%',
        overflow: 'scroll',
        margin: 0,
        padding: 0,
    },
    AppBarStyle: {
        paddinTop: '0',
        marginBottom: '0',
        backgroundColor: '#FFFFFF',
        textAlign: 'left',
        alignItems: 'left',
        color: '#000',
        boxShadow: '0 0px 0px 0px',
        borderBottom: '1px solid #D0DAED',
        '& > span': {
            backgroundColor: '#0080FC',
        },
    },
    AppTab: {
        color: '#0080FC',
        fontWeight: 'bold'
    },
    heading: {
        textAlign: 'left',
        font: 'normal normal 600 15px/22px Mulish',
        color: '#0F7BFF',
        opacity: 1,
    },
    aco: {
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        border: '1px solid #E1E5EB',
        borderRadius: '6px 6px 0px 0px',
        opacity: '1',
    },
    border: {
        borderBottom: '1px solid #E1E5EB'
    },

}));

export const Control = ({ children, ...props }) => {
    const style = { cursor: 'pointer', padding: '0 10px', fontSize: 'large', };
    return (
        <components.Control {...props}>
            <span style={style}>
                <HiOfficeBuilding style={{ color: '#0080FC ' }} />
            </span>
            {children}
        </components.Control>
    );
};
export const TabListStyled = withStyles((theme) => ({
    indicator: {
        backgroundColor: '#0080FC',
    },

}))(TabList);

export const TabStyled = withStyles((theme) => ({
}))(Tab);