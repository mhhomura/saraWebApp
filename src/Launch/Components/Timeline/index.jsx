import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import Typography from '@material-ui/core/Typography';
import axios_base from '../../../axios_base';
import { useParams, useLocation } from 'react-router-dom';
import moment from 'moment';
import MessageForm from '../MessageForm';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import { useTranslation } from "react-i18next";
import { MdSchedule, MdDoneAll } from 'react-icons/md';
import { BiError } from 'react-icons/bi';
import {
    Container,
    Div,
} from './styles';


const TimeLineCuston = () => {
    const { t } = useTranslation();
    var language = navigator.language.substring(0, 2);
    let location = useLocation();
    let { id } = useParams();
    const [group, setGroup] = React.useState([]);
    const [message, setMessage] = React.useState([]);
    var dateFormat = null;
    if (language === 'pt') {
        dateFormat = 'D/MM/YYYY, LTS ';
    } else {
        dateFormat = 'MMMM Do YYYY, h:mm:ss a';
    }

    React.useEffect(() => {
        function getGroup(id_) {
            try {
                axios_base.get(`/campaign/${id_}`)
                    .then(res => {
                        console.log(res.data);
                        setGroup(res.data);
                    })
            } catch (error) {

            }
        }
        function getMessage(_id) {
            try {
                axios_base.get(`/campaign/${_id}/message`)
                    .then(res => {
                        console.log(res.data);
                        setMessage(res.data);
                    })
            } catch (error) {

            }
        }
        getGroup(id);
        getMessage(id);
    }, [id, location]);

    return (
        <Container>
            <Timeline align="alternate">

                {message.map((message) => (
                    <TimelineItem key={message?.id} >

                        <TimelineSeparator>
                            <TimelineDot>
                                {message?.type === 'text' && <MessageForm buttonLabel={<MessageOutlinedIcon messageid={message?.id} campaignid={id} origem={`timeLine`} />} title={t("words.message")} />}
                                {message?.type === 'image' && <MessageForm buttonLabel={<PhotoCamera messageid={message?.id} campaignid={id} origem={`timeLine`} />} title={t("words.message")} />}
                                {message?.type === 'video' && <MessageForm buttonLabel={<VideocamIcon messageid={message?.id} campaignid={id} origem={`timeLine`} />} title={t("words.message")} />}
                                {message?.type === 'audio' && <MessageForm buttonLabel={<AudiotrackIcon messageid={message?.id} campaignid={id} origem={`timeLine`} />} title={t("words.message")} />}
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Div>
                                <Typography variant="h6" component="h1">
                                    {message?.name} (
                                    {message?.status === 'completed' && <MdDoneAll style={{ fontSize: '75%' }} />}
                                    {message?.status === 'pending' && <MdSchedule style={{ fontSize: '75%' }} />}
                                    {message?.status === 'failed' && <BiError style={{ fontSize: '75%' }} />}
                                    )
                                </Typography>
                                <Typography>
                                    {message?.type === 'text' && message?.content}
                                    {message?.type === 'image' && <img alt="img" src={`${process.env.REACT_APP_LINK_API}/storage/${message?.content}`} style={{ width: '25%', height: '25%' }} />}
                                    {message?.type === 'video' && <video controls src={`${process.env.REACT_APP_LINK_API}/storage/${message?.content}`} style={{ width: '25%', height: '25%' }} />}
                                    {message?.type === 'audio' && <audio controls src={`${process.env.REACT_APP_LINK_API}/storage/${message?.content}`} ></audio>}
                                    <div style={{ marginBottom: '2%' }}></div>
                                    <Typography variant="body2" color="textSecondary">
                                        {moment(message?.send_at).format(dateFormat)}
                                    </Typography>

                                </Typography>
                            </Div>
                        </TimelineContent>
                    </TimelineItem>
                ))}
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot color="primary">
                            <PlayCircleFilledWhiteOutlinedIcon />
                        </TimelineDot>
                    </TimelineSeparator>
                    <TimelineContent>
                        <Div>
                            <Typography variant="h6" component="h1">
                                {group?.name}
                            </Typography>
                            <Typography>{t("words.created")} {moment(group?.created_at).format(dateFormat)}!</Typography>
                        </Div>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
        </Container>

    );
}

export default TimeLineCuston;