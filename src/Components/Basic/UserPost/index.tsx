import { useQuery } from "@apollo/client";
import avatarIcon from "@Assets/images/profile.jpeg";
import { GET_ACCOUNT_INFO_QUERY } from "@Libs/Queries/getAccountInfoQuery";
import { useRouter } from "next/router";
import Gallery from 'react-photo-gallery';
import { useState } from "@hookstate/core";
import { getAuthInfo } from "src/Commons/Auths/utils";
import { FormatString } from "src/Commons/Strings/utils";
import { PROFILE_PAGE_ROUTE } from "src/Routes/contants";
import { useCallback } from "react";
interface IPhotoData {
    src: string;
    width: number;
    height: number;
}

const boundContainer = {
    left: "0%",
    position: "absolute",
    top: "50%",
    transform: "translate(0%, -50%)",
    paddingLeft: "10px",
    display: "flex",
} as React.CSSProperties;
const iconTicketStyle = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    overflow: "hidden",
    marginLeft: "-10px",
    border: "solid 2px white",
};


interface IAccountInfo {
    firstName: string;
    lastName: string;
    avatarUrl: string;
}
interface IMedia {
    type?: string;
    url: string;
}

interface IUserPostProp {
    id: string;
    isDetail?: boolean;
    accountId?: string;
    cnt?: string;
    medias?: Array<IMedia>
    num_reacts?: number;
    num_comments?: number;
    num_shared?: number;
}


export const UserPost = (props: IUserPostProp) => {
    const router = useRouter();

    // setUp state
    const accountName = useState("");
    const accountAvatar = useState("");

    const handleRouteToParnerProfile = useCallback(
        async () => {
            await router.push(FormatString(PROFILE_PAGE_ROUTE, `${props.accountId}`))
        },
        [],
    )

    const { authToken } = getAuthInfo();

    const { loading, error, data } = useQuery(GET_ACCOUNT_INFO_QUERY, {
        variables: {
            auth_token: authToken,
            account_id: props.accountId
        }
    });

    if (error) {
        return <div>Error when loading account</div>
    }
    if (loading) {
        return null;
    }


    const accountInfo: IAccountInfo = data.accountProfile

    accountName.set(`${accountInfo.firstName} ${accountInfo.lastName}`)
    accountAvatar.set(accountInfo.avatarUrl)




    return (
        <div style={{ backgroundColor: "white", padding: "10px", margin: "1px" }}>
            <div className="header_post" style={{ height: "60px", position: "relative" }}>
                <div style={boundContainer} onClick={() => { handleRouteToParnerProfile() }}>
                    <div style={{ width: "54px", height: "54px", borderRadius: "50%", overflow: "hidden" }}>
                        <img style={{ height: "100%", width: "100%" }} alt="X" src={accountAvatar ? accountAvatar.value : avatarIcon} />
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                        <p style={{ margin: "4px 0px", fontWeight: "bold" }}>{accountName.value}</p>
                        <p style={{ margin: "0px", fontSize: "12px", color: "#9597A1" }}>4 mins ago</p>
                    </div>
                </div>
            </div>
            <div className="main_post" style={{ margin: "0px 10px" }}>
                <p>{props.cnt ? props.cnt : "We are facing a serious business dilemma, with Facebook taking away a good chunk of traffic to news and content sites, and ad blockers eating into what’s left of it while slashing ad revenues."}</p>
                <Gallery photos={
                    (props.medias?.map(
                        (media, _idx) => {
                            return {
                                src: media.url ? media.url : "",
                                width: _idx + 1,
                                height: _idx + 1,
                            }
                        }) as any)
                } />

            </div>
            <div className="footer_post" style={{ height: "40px", position: "relative" }}>
                <div style={boundContainer}>
                    <div style={{ display: "flex", marginRight: "5px" }}>
                        <div style={iconTicketStyle}>
                            <img style={{ height: "100%", width: "100%" }} alt="X" src={avatarIcon} />
                        </div>
                        <div style={iconTicketStyle}>
                            <img style={{ height: "100%", width: "100%" }} alt="X" src={avatarIcon} />
                        </div>
                        <div style={iconTicketStyle}>
                            <img style={{ height: "100%", width: "100%" }} alt="X" src={avatarIcon} />
                        </div>
                    </div>

                    <p style={{ margin: "0px", lineHeight: "30px", color: "#9597A1" }}>{`${props.num_reacts} likes`} </p>
                </div>

                <div style={{ right: "0%", position: "absolute", top: "50%", transform: "translate(0%, -50%)", display: "flex" }} onClick={() => { alert("Turn on comment") }}>
                    <p style={{ margin: "0px", marginRight: "5px", color: "#9597A1" }}>{`${props.num_comments} comments`}</p>
                </div>
            </div>
        </div>
    )
}
