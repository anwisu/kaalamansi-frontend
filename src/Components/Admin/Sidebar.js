import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { getToken } from '../../utils/helpers';
import {
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
    TableCellsIcon
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

    useEffect(() => {
        getProfile();
    }, []);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card className="h-full h-max-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 fixed top-0">            
        <div className="mb-2 flex items-center gap-4 p-4">
                <img src={process.env.PUBLIC_URL + '/images/user.png'} alt="avatar" className="h-8 w-8" />
                <Typography variant="h5" color="blue-gray">
                    Admin <span style={{ color: "#008302" }}>{user.name}</span>
                </Typography>
            </div>
            <div className="p-2">
                <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" />
            </div>
            <List>
                <Accordion
                    open={open === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 1}>
                        <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5" style={{ color: "#008302" }} />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Prediction Models
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
                                    {menu === "Quality" ?<span>Quality</span>  : <span>Quality</span> }
                                </Link>
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" style={{ color: "#008302" }} />
                                </ListItemPrefix>
                                <Link style={{ textDecoration: 'none' }} to="/admin/disease/dataset">
                                    {menu === "Disease" ?<span>Disease</span>  : <span>Disease</span> }
                                </Link>
                            </ListItem>

                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={open === 2}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                            style={{ color: "#008302" }}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 2}>
                        <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <TableCellsIcon className="h-5 w-5" style={{ color: "#008302" }} />    
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Datatables
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" style={{ color: "#008302" }} />
                                </ListItemPrefix>
                                <Link style={{ textDecoration: 'none' }} to="/admin/users">
                                    {menu === "Users" ?<span>Users</span>  : <span>Users</span> }
                                </Link>
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" style={{ color: "#008302" }} />
                                </ListItemPrefix>
                                <Link style={{ textDecoration: 'none' }} to="/admin/quality/all">
                                    {menu === "Quality" ?<span>Quality</span>  : <span>Quality</span> }
                                </Link>
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" style={{ color: "#008302" }} />
                                </ListItemPrefix>
                                <Link style={{ textDecoration: 'none' }} to="/admin/disease/all">
                                    {menu === "Disease" ?<span>Disease</span>  : <span>Disease</span> }
                                </Link>
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <hr className="my-2 border-blue-gray-50" />
                <ListItem>
                    <ListItemPrefix>
                        <InboxIcon className="h-5 w-5" style={{ color: "#008302" }} />
                    </ListItemPrefix>
                    Inbox
                    <ListItemSuffix>
                        <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" style={{ color: "#008302" }} />
                    </ListItemSuffix>
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" style={{ color: "#008302" }} />
                    </ListItemPrefix>
                    Profile
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" style={{ color: "#008302" }} />
                    </ListItemPrefix>
                    Settings
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" style={{ color: "#008302" }} />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>

        </Card>
    )
}

export default Sidebar