import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { getToken, logout } from '../../utils/helpers';
import {
    Avatar,
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Alert,
    Input,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    TableCellsIcon,
    DocumentMagnifyingGlassIcon,
    UserGroupIcon,
    PresentationChartLineIcon
} from "@heroicons/react/24/solid";
import {
    ChevronRightIcon,
    ChevronDownIcon,
    CubeTransparentIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
    const [menu, setMenu] = useState("");
    const [open, setOpen] = React.useState(0);
    const [openAlert, setOpenAlert] = React.useState(true);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const getProfile = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        };

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/me`, config);
            setUser(data.user);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_API}/logout`);
            logout(); // Remove token and user data from session storage
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        // <Card className="h-full h-max-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/0 top-0 fixed z-10" style={{backgroundColor: '#F2FFF5'}}>
        <Card className="h-full h-max-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-lg top-0 fixed z-10">
            <div className="mt-20 mb-2 flex items-center justify-center gap-2 p-4">
                {/* <Link to="/">
                    <img
                        src={process.env.PUBLIC_URL + "/images/citrus.png"}
                        className=" h-20 w-20 animate-bounce animate-infinite animate-ease-in"
                        alt="Kaalamansi Logo"
                    />
                </Link> */}
                <Avatar
                    src={user && user.avatar ? user.avatar.url : 'defaultAvatarUrl'}
                    alt="avatar"
                    // withBorder={true}
                    // color="green"
                    className="border border-green-700 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
                />
                <Typography variant="h5" color="blue-gray">
                    Admin <span style={{ color: "#008302" }}>{user.name}</span>
                </Typography>
            </div>
            <div className="p-2">
                <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" />
            </div>
            <List>
                <Accordion
                    icon={
                        <Link style={{ textDecoration: 'none' }} to="/admin/dashboard">
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4`}
                            />
                        </Link>
                    }
                >
                    <ListItem className="p-0" selected={open === 1}>
                        <AccordionHeader className="border-b-0 p-3">
                            <ListItemPrefix>
                                <PresentationChartLineIcon className="h-5 w-5" style={{ color: "#008302" }} />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                <Link style={{ textDecoration: 'none' }} to="/admin/dashboard">
                                    {menu === "Users" ? <span>Dashboard</span> : <span>Dashboard</span>}
                                </Link>
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                </Accordion>
                <Accordion
                    open={open === 2}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 2}>
                        <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5" style={{ color: "#008302" }} />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Models
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" style={{ color: "#008302" }} />
                                </ListItemPrefix>
                                <Link style={{ textDecoration: 'none' }} to="/admin/quality/dataset">
                                    {menu === "Quality" ? <span>Quality Model</span> : <span>Quality Model</span>}
                                </Link>
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" style={{ color: "#008302" }} />
                                </ListItemPrefix>
                                <Link style={{ textDecoration: 'none' }} to="/admin/disease/dataset">
                                    {menu === "Disease" ? <span>Disease Model</span> : <span>Disease Model</span>}
                                </Link>
                            </ListItem>

                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={open === 3}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
                            style={{ color: "#008302" }}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 3}>
                        <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <DocumentMagnifyingGlassIcon className="h-5 w-5" style={{ color: "#008302" }} />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Predictions
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" style={{ color: "#008302" }} />
                                </ListItemPrefix>
                                <Link style={{ textDecoration: 'none' }} to="/admin/quality/all">
                                    {menu === "Quality" ? <span>Quality Predictions</span> : <span>Quality Predictions</span>}
                                </Link>
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" style={{ color: "#008302" }} />
                                </ListItemPrefix>
                                <Link style={{ textDecoration: 'none' }} to="/admin/disease/all">
                                    {menu === "Disease" ? <span>Disease Predictions</span> : <span>Disease Predictions</span>}
                                </Link>
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={open === 4}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 4}>
                        <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <TableCellsIcon className="h-5 w-5" style={{ color: "#008302" }} />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Recommendations
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" style={{ color: "#008302" }} />
                                </ListItemPrefix>
                                <Link style={{ textDecoration: 'none' }} to="/admin/quality/recommendations/all">
                                    {menu === "Quality" ? <span>Quality Recommendations</span> : <span>Quality Recommendations</span>}
                                </Link>
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" style={{ color: "#008302" }} />
                                </ListItemPrefix>
                                <Link style={{ textDecoration: 'none' }} to="/admin/disease/recommendations/all">
                                    {menu === "Disease" ? <span>Disease Recommendations</span> : <span>Disease Recommendations</span>}
                                </Link>
                            </ListItem>

                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    icon={
                        <Link style={{ textDecoration: 'none' }} to="/admin/users">
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4`}
                            />
                        </Link>
                    }
                >
                    <ListItem className="p-0" selected={open === 5}>
                        <AccordionHeader className="border-b-0 p-3">
                            <ListItemPrefix>
                                <UserGroupIcon className="h-5 w-5" style={{ color: "#008302" }} />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                <Link style={{ textDecoration: 'none' }} to="/admin/users">
                                    {menu === "Users" ? <span>Users</span> : <span>Users</span>}
                                </Link>
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                </Accordion>
                <hr className="my-2 border-blue-gray-50" />
                <Link to='/me'>
                <ListItem>
                    <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" style={{ color: "#008302" }} />
                    </ListItemPrefix>
                    Profile
                </ListItem>
                </Link>
                {/* <ListItem>
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" style={{ color: "#008302" }} />
                    </ListItemPrefix>
                    Settings
                </ListItem> */}
                <Link onClick={handleLogout}>
                <ListItem>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" style={{ color: "#008302" }} />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
                </Link>
            </List>

        </Card>
    )
}

export default Sidebar