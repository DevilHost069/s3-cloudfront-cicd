import React, { useState } from "react";
import CustomCard from "@components/Card";
import { useGetPatientTimelineData, ITimelineData } from "@server/patient/getPatientTimeline";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { ITimelineEvents } from "@components/prescriber/PrescriberDetail/main";

type ITimelineProps = {
    setTitle: (title: string) => void;
    timeline_events: ITimelineEvents;
};

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const remainingSecondsAfterMinutes = remainingSeconds % 60;

    let formattedDuration = "";

    if (hours > 0) {
        formattedDuration += `${hours}h`;
        if (minutes > 0 || remainingSecondsAfterMinutes > 0) {
            formattedDuration += " ";
        }
    }

    if (minutes > 0) {
        formattedDuration += `${minutes}m`;
        if (remainingSecondsAfterMinutes > 0) {
            formattedDuration += " ";
        }
    }

    if (remainingSecondsAfterMinutes > 0) {
        formattedDuration += `${remainingSecondsAfterMinutes}s`;
    }

    return formattedDuration.trim();
}

export default function PatientTimeline({
    timeline_events,
}: ITimelineProps) {
    const { data } = timeline_events;
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleTimeline = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <style>
                {`
                .timeline-item {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    margin-bottom: 12px;
                }
                
                .action-items {
                    float: right;
                    text-align: right;
                }

                .avatar {

                }

                .content {
                    align-self: stretch;
                    flex-direction: column;
                    gap: 12px;
                    margin-left: 1.5em;

                }
            `}
            </style>
            <div className="main-detail">
                <CustomCard
                    title={"Patient Timeline"}
                >
                    <div className="action-items">
                        <button className="btn btn-link" onClick={toggleTimeline}>
                            {isExpanded ? "Collapse" : "Expand"}
                        </button>

                        <div className="mb-3">
                            <select className="form-select">
                                <option>Show all History</option>
                            </select>
                        </div>
                    </div>

                    {isExpanded && data?.length > 0 && (
                        <>
                            {data?.map((event, index) => {
                                const startTime = new Date(event.booked_date_time);
                                const formattedStartTime = startTime.toLocaleString("en-GB", {
                                    day: "numeric",
                                    month: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                });
                                const formattedDuration = formatDuration(event.duration);

                                return (

                                    <div key={index}>
                                        <CustomCard title="" editable={false}>
                                            <div className="timeline-item">
                                                <div className="avatar">
                                                    <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: '2em' }} />
                                                </div>
                                                <div className="content">
                                                    <div>{formattedStartTime} ({formattedDuration})</div>
                                                    <div>{event.consultation_type}</div>
                                                    <div>{event.consultor_first_name} {event.consultor_last_name}</div>
                                                </div>
                                            </div>
                                        </CustomCard>
                                    </div>

                                );
                            })}
                        </>
                    )}
                </CustomCard>
            </div>
        </>
    );
}
