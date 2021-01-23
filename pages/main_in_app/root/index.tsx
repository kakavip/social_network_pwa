import { NextPage } from "next";
import { IMainInAppRoot } from "@Interfaces"
import { withTranslation } from "@Server/i18n";

import avatarIcon from "@Assets/images/profile.jpeg";
import notifyIcon from "@Assets/images/alarm.png";
import { StoryHome, FollowerHome, UserPost } from "@Components/Basic";
import NavFooter, { NavPageType } from "@Components/NavFooter";
import AuthenticatePageRequired from "@Components/Auths/AuthenticatePageRequired";
import { useQuery } from "@apollo/client";
import { GET_USER_FOLLOW_LIST_QUERY } from "@Libs/Queries/getUserFollowListQuery";
import { getAuthInfo } from "src/Commons/Auths/utils";
import { GET_USER_STORY_LIST_QUERY } from "@Libs/Queries/getUserStoryListQuery";

const absoluteCenter = {
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
};

const styles = {
    container: {
        // backgroundColor: "yellow",
        height: "100vh",
        position: "relative",
    },

    footer: {
        backgroundColor: "#8000FF",
        height: "94px",
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        display: "flex",
        zIndex: "2"
    },
    main: {
        // backgroundColor: "#9597A1",
        height: "100%",
        paddingTop: "59px",
        paddingBottom: "94px",
        zIndex: "1"
    },
    header: {
        backgroundColor: "white",
        height: "59px",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        overflow: "hidden",
        zIndex: "2"
    },
    iconContainer: {
        height: "100%",
        width: "25%",
        position: "relative",
    },
    icon: {
        opacity: "70%",
        textAlign: "center",
        height: "50px",
        width: "50px",
        ...absoluteCenter,
    },
    profileIcon: {
        textAlign: "center",
        height: "40px",
        width: "40px",
        top: "50%",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
    },
    notifyIcon: {
        textAlign: "center",
        height: "35px",
        width: "35px",
        top: "50%",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
    },
    avatarHeader: {
        height: "100%",
        width: "70px",
        top: "0%",
        left: "0%",
        position: "absolute",
    },
    txtHeader: {
        width: "100%",
        height: "100%",
        textAlign: "center",
        paddingLeft: "70px",
        paddingRight: "40px",
        lineHeight: "59px",
    },
    notifyHeader: {
        height: "100%",
        width: "40px",
        top: "0%",
        right: "0%",
        position: "absolute",
    }
};

const UserStoryList = (props: any) => {
    const { accountId, authToken } = getAuthInfo()

    const { loading, error, data } = useQuery(GET_USER_STORY_LIST_QUERY, {
        variables: {
            auth_token: authToken,
            account_id: accountId
        }
    })
    if (error) {
        return <div>Error loading players.</div>;
    }

    if (loading) {
        return null;
    }

    const userStories: Array<any> = data.userStories
    console.log(data.userStories)

    return (
        <>
            {
                userStories.map((user, idx) =>
                    < StoryHome key={idx} name={user.name} imgSrc={user.mediaDatas[0].mediaUrl} />
                )
            }
        </>
    )
}



const UserFollowList = (props: any) => {
    const { accountId, authToken } = getAuthInfo()
    const { loading, error, data } = useQuery(GET_USER_FOLLOW_LIST_QUERY, {
        variables: {
            auth_token: authToken,
            account_id: accountId
        }
    });

    if (error) {
        return <div>Error loading players.</div>;
    }
    if (loading) {
        return null
    }
    const userFollowers: Array<any> = data.userFollowers

    return (
        <>{
            userFollowers.map((user, idx) =>
                <FollowerHome key={idx} name={user.name} id={user.id} srcImg={user.avatar} />
            )
        }
        </>
    )
}

const MainInAppRoot: NextPage<
    IMainInAppRoot.IProps,
    IMainInAppRoot.InitialProps
> = ({ }) => {
    // eslint-disable-next-line react/react-in-jsx-scope
    return (
        <AuthenticatePageRequired>
            <div style={styles.container as React.CSSProperties}>
                <div style={styles.header as React.CSSProperties}>
                    <div style={styles.avatarHeader as React.CSSProperties}>
                        <img style={styles.profileIcon as React.CSSProperties} src={avatarIcon} alt="X" />
                    </div>
                    <div style={styles.txtHeader as React.CSSProperties}>
                        <p style={{ color: "#0066FF", fontWeight: "bold", fontSize: "24px" }}>Good Morning</p>
                    </div>
                    <div style={styles.notifyHeader as React.CSSProperties}>
                        <img style={styles.notifyIcon as React.CSSProperties} src={notifyIcon} />
                    </div>
                </div>
                <div style={styles.main as React.CSSProperties}>
                    <div style={{
                        display: "flex",
                        overflowX: "auto",
                        overflowY: "hidden",
                        whiteSpace: "nowrap",
                    }}>
                        <UserStoryList />
                    </div>

                    <div style={{
                        display: "block",
                        overflowX: "auto",
                        overflowY: "hidden",
                        whiteSpace: "nowrap",
                        backgroundColor: "white",
                    }}>
                        <UserFollowList />
                    </div>
                    <UserPost />
                    <UserPost />
                    <UserPost />
                </div>
                <NavFooter type={NavPageType.HOME} />
            </div >
        </AuthenticatePageRequired>
    );
};


const Extended = withTranslation("common")(MainInAppRoot);

export default Extended;
