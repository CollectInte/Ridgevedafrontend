'use client'
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from 'xlsx';
import { styled, useTheme } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardMedia from '@mui/material/CardMedia';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Box from '@mui/material/Box';
import MailIcon from '@mui/icons-material/Mail';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    CircularProgress,
    Card,
    CardContent,
    TextareaAutosize,
    CardActions,Grid
} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BuildIcon from '@mui/icons-material/Build';
import StarIcon from '@mui/icons-material/Star';
import ArticleIcon from '@mui/icons-material/Article';
import ContactsIcon from '@mui/icons-material/Contacts';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import Modal from '@mui/material/Modal';
import { Description } from '@mui/icons-material';
import '../../styles/text.css';
import { get } from 'react-hook-form';
import Mammoth from "mammoth";
import { useRouter } from "next/navigation";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: "500px",
    overflowY: 'auto',
};


const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);




export default function MiniDrawer() {
    const router = useRouter();
   // const { session,setSession } = useSession();
    const theme = useTheme();
    const [blogopen, setBlogOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState('Dashboard'); // State to manage the displayed content
    const [enquirydata, setEnquirydata] = React.useState([]);
    const [filteredEnquiryData, setFilteredEnquiryData] = React.useState([]);
    const [filteredContactData, setFilteredContactData] = React.useState([]);
    const [contactdata, setContactdata] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [sanckbaropen, setSnackbaropen] = React.useState(false);
    const [snackbarmessage, setSnackbarmessage] = React.useState('');
    const [nameFilter, setNameFilter] = React.useState('');
    const [emailFilter, setEmailFilter] = React.useState('');
    const [dateFilter, setDateFilter] = React.useState('');
    const [contactnameFilter, setContactNameFilter] = React.useState('');
    const [contactemailFilter, setContactEmailFilter] = React.useState('');
    const [contactdateFilter, setContactDateFilter] = React.useState('');
    const [activeUsers, setActiveUsers] = React.useState(0);
    const [websiteClicks, setWebsiteClicks] = React.useState(0);
    const [monthlyTraffic, setMonthlyTraffic] = React.useState(0);
    const [conversionRates, setConversionRates] = React.useState(0);
    const [avgSessionDuration, setAvgSessionDuration] = React.useState(0);
    const [image,setImage]=React.useState(null);
    const [formData, setFormData] = React.useState({
        Category: '',
        Tag: '',
        Author: '',
        Image: null,
        Title: '',
        Description: '',
    });
   
    const [formContent,setFormContent]=React.useState([
        ["Category", ""],
        ["Tag", ""],
        ["Author", ""],
        ["Image", null],
        ["Title", ""],
        ["Description", []]  // Description is now an empty array
      ]);
    const [blogtitle,setBlogTitle]=React.useState("");
    const [blogdata, setBlogdata] = React.useState([]);
    const [projectsdata,setProjectsdata]=React.useState([]);
    const [blogmodal, setBlogModal] = React.useState(false);
    const [blogmodaldata, setBlodModaldata] = React.useState([]);
    // state to store boolean value to update when edit button clicked
    const [editData,setEditData]=React.useState(false);
    // state to manage adding more paragraphs 
    const [paragraphs, setParagraphs] = React.useState([]);
    const [currentText, setCurrentText] = React.useState("");
    const [paragraphOpen,SetParagraphOpen]=React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [editIndex, setEditIndex] = React.useState(null);
    const [splitArray,setSplitArray]=React.useState([]);//state variable to store editted paragraphs
    const [selectedFile, setSelectedFile] =React.useState(null); //to store document
    const [storeEmail,setStoreEmail]=React.useState(null);
    const [isLogin,setIsLogin]=React.useState('false');
    const [emailData, setEmailData] = React.useState({
        emailImage: null, // For storing image (file or URL)
        emailTitle: "",   // For storing title
        emailContent: ""  // For storing text editor value
      });
      const [recipientEmail, setRecipientEmail] = React.useState("");
      const [projectImage, setProjectImage] = React.useState("");
      const [projectContent, setProjectContent] = React.useState("");
      const [projectUrl, setProjectUrl] = React.useState("");
   

    const trafficChartData = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"], // Example labels
        datasets: [
            {
                label: "Monthly Traffic",
                data: [1000, 1500, 1200, 1800], // Example data
                fill: false,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(75,192,192,1)",
            },
        ],
    };
    // Dashboard Api
    const [popupformEntries,setPopupFormEntries]=React.useState([]);
    // snackbar
    const handleClose = () => {

        setSnackbaropen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    // snackbar
   //Service page popup form data fetching 
   
//    React.useEffect(() => {
//     const fetchData = async () => {
//         try {
//         const response = await fetch(process.env.NEXT_PUBLIC_SCRIPT_SERVICES_POPUP_GET);
//         const data = await response.json();
//         console.log('Form entries:', data.data); // handle records
//         setPopupFormEntries(data.data);
//         console.log("popup form data"+popupformEntries);
//         } catch (error) {
//         console.error('Fetch error:', error);
//         }
//     };

//     fetchData();
//     }, []);
  
        React.useEffect(() => {
            const fetchScriptData = async () => {
            try {

                const response = await fetch(process.env.NEXT_PUBLIC_SCRIPT_ENQUIRY_GET
                );
                const data = await response.json();
                console.log("Response from Google Script:", data);

                // ✅ store data in state
                setEnquirydata(data.data || data); 
                console.log("enquiry data is",enquirydata);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
            };

            fetchScriptData();
        }, []);
     
            React.useEffect(() => {
            const fetchContactData = async () => {
                try {
                const response = await fetch(process.env.NEXT_PUBLIC_SCRIPT_CONTACT_GET);
                const data = await response.json();
                console.log('contact detail raw:', data.data);
                setContactdata(data.data);
                
                } catch (error) {
                console.error('Fetch error:', error);
                }
            };

            fetchContactData();
            }, []); // empty array → runs once only
            React.useEffect(() => {
            console.log("Updated contact details:", contactdata);
            }, [contactdata]);


     React.useEffect(() => {
    const fetchEnquiryData = async () => {
        try {
        const response = await fetch(process.env.NEXT_PUBLIC_SCRIPT_ENQUIRY_GET);
        const data = await response.json();
        console.log('Form entries:', data.data); // handle records
        setEnquirydata(data.data);
        console.log("popup form data"+popupformEntries);
        } catch (error) {
        console.error('Fetch error:', error);
        }
    };

    fetchEnquiryData();
    }, []);
    // CSV Report
    const handleGenerateCSV = () => {
        if (filteredContactData.length === 0) {
            setSnackbarmessage("No data available to export.");
            setSnackbaropen(true);
            return;
        }

        // Prepare CSV data
        const headers = [
            "ID",
            "Name",
            "Email Address",
            "Mobile No",
            "Subject",
            "Message",
            "Date & Time",
        ];

        const rows = filteredContactData.map(row => [
            row.ID,
            row.Name,
            row.Email,
            row.Phone,
            row.Subject,
            row.Message,
            row.created_at,
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(value => `"${value}"`).join(",")),
        ].join("\n");

        // Create a Blob and download the file
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "ContactData.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    // CSV Report

    // Enquiry CSV Report
    const handleGenerateEnquiryCSV = () => {
        if (filteredEnquiryData.length === 0) {
            setSnackbarmessage("No data available to export.");
            setSnackbaropen(true);
            return;
        }
    
        // Prepare data for Excel
        const rows = filteredEnquiryData.map(row => ({
            ID: row.id, // Ensure this property exists in your data
            Name: row.Name, // Ensure this property exists in your data
            EmailAddress: row.Email, // Ensure this property exists in your data
            MobileNo: row.Contact, // Ensure this property exists in your data
            DateTime: row.Role, // Ensure this property exists in your data
        }));

        // Create a new workbook and add the data
        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Enquiry Data');

        // Export the Excel file
        XLSX.writeFile(workbook, 'EnquiryData.xlsx');
    }
    // Enquiry CSV Report


    // loader

    React.useEffect(() => {
        
        const timer = setTimeout(() => {
            setLoading(false); // Disable loader after 3 seconds
            
        }, 6000);

        return () => clearTimeout(timer);
    }, [])

    const handleImageChange = (event) => {
        const file = event.target.files[0]; // Get the first selected file
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(file); // Set image as Base64 string
            };
            reader.readAsDataURL(file); // Convert the image to Base64
        }
    };

    // const handleProjectImageChange = (event) => {
    //     const file = event.target.files[0]; 
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setProjectImage(file);
    //         };
    //         reader.readAsDataURL(file); 
    //     }
        
    // };


    // const handleProjectImageChange = async (event) => {
    //     const file = event.target.files[0]; 
    //     if (!file) return; 
    
    //     try {
    //         const base64String = await convertImageToBase64(file); 
    //         setProjectImage(base64String.split(',')[1]); 
    //     } catch (error) {
    //         console.error("Error converting image:", error);
    //     }
    // };


    // const handleProjectImageChange = (event) => {
    //     const file = event.target.files[0]; 
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             console.log("New Base64 Image:", reader.result); 
    //             setProjectImage(reader.result); /
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleProjectImageChange = (event) => {
       
                setProjectImage(event.target.files[0]); 
            
    };
    
    
    

  
    

    const handleProjectsContentChange = (event) => {
        setProjectContent(event.target.value);
    };

    const handleProjectsUrlChange = (event) => {
        setProjectUrl(event.target.value);
    };

    const handleEmailImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file); // Convert file to Base64
            reader.onloadend = () => {
                setEmailData((prevState) => ({
                    ...prevState,
                    emailImage: reader.result, // Store full Base64 string (including prefix)
                }));
            };
        }
    };

    const handleEmailTitleChange = (event) => {
        const { value } = event.target;
        setEmailData((prevState) => ({
            ...prevState,
            emailTitle: value, // Update emailTitle field
        }));
    };

    const handleEmailContentChange = (event) => {
        const { value } = event.target;
        setEmailData((prevState) => ({
            ...prevState,
            emailContent: value, // Update emailContent field
        }));
    };

// Initial data fetch

    // React.useEffect(() => {
    //     const sessionEmail=sessionStorage.getItem('email');
    //     const sessionLogin=sessionStorage.getItem('isLogin');
    //     setStoreEmail(sessionEmail);
    //     setIsLogin(sessionLogin);
    //     if(!isLogin){
    //         router.push("/admin");
    //     }
    //     else{
    //         router.push("/dashboard");
    //     }
       
       
    //   }, [storeEmail]);


    React.useEffect(() => {
        // Get values from sessionStorage
        
        console.log("session login is"+isLogin);
        const sessionEmail = sessionStorage.getItem('email');
        const sessionLogin = sessionStorage.getItem('isLogin')==='true';
        setStoreEmail(sessionEmail);
        setIsLogin(sessionLogin); // Ensure it's a boolean value
        // Redirect based on the login status
        if ( !sessionLogin  ) {
          // If user is not logged in, redirect to /admin
           router.push("/admin");
           console.log("is session login",sessionLogin);
        }
        
    
      }, []);

    // loader

   const downloadResume = (base64String, fileName) => {
    if (!base64String || typeof base64String !== "string") {
        console.error("Invalid base64 string");
        return;
    }

    // Clean Base64 string
    const cleanBase64 = base64String
        .replace(/^data:.*;base64,/, "") // remove prefix
        .replace(/\s/g, "");             // remove spaces/newlines

    const link = document.createElement("a");

    const fileExtension = fileName.split(".").pop().toLowerCase();
    let mimeType;

    switch (fileExtension) {
        case "pdf":
            mimeType = "application/pdf";
            break;
        case "docx":
            mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            break;
        case "txt":
            mimeType = "text/plain";
            break;
        case "jpg":
        case "jpeg":
            mimeType = "image/jpeg";
            break;
        case "png":
            mimeType = "image/png";
            break;
        default:
            console.error("Unsupported file type");
            return;
    }

    link.href = `data:${mimeType};base64,${cleanBase64}`;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


    // Enquiry Search

    const handleSearch = () => {
        const filtered = enquirydata.filter((row) => {
            const matchesName = nameFilter
                ? row.customername.toLowerCase().includes(nameFilter.toLowerCase())
                : true;
            const matchesEmail = emailFilter
                ? row.email.toLowerCase().includes(emailFilter.toLowerCase())
                : true;
            const matchesDate = dateFilter
                ? row.datetime.startsWith(dateFilter) // Match date filter
                : true;

            return matchesName && matchesEmail && matchesDate;
        });

        setFilteredEnquiryData(filtered); // Update the filtered data
    };

    const resetFilters = () => {
        setNameFilter('');
        setEmailFilter('');
        setDateFilter('');
        setFilteredEnquiryData(enquirydata); // Reset to full data
    };

    // Enquiry Search

    // Contact Search

    const ContacthandleSearch = () => {
        const filteredData = contactdata.filter((row) => {
            const nameMatches = contactnameFilter
                ? row.Name.toLowerCase().includes(contactnameFilter.toLowerCase())
                : true;
            const emailMatches = contactemailFilter
                ? row.Email.toLowerCase().includes(contactemailFilter.toLowerCase())
                : true;

            return nameMatches && emailMatches;
        });
        setFilteredContactData(filteredData);
    };

    const handleReset = () => {
        setContactNameFilter('');
        setContactEmailFilter('');
        setContactDateFilter('');
        setFilteredContactData(contactdata);
    };

    // Contact Search


    // Delete the Enquiry
            const handleDelete = async (userId) => {
            if (!userId) {
                alert("Please enter a user ID.");
                return;
            }

            try {
                setLoading(true);

                const response = await fetch(`${process.env.NEXT_PUBLIC_SCRIPT_ENQUIRY_DELETE_BY_ID}/${userId}`, {
                method: "DELETE", // ✅ safer than DELETE for PHP
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ id: userId }),
                });

                const data = await response.json();

                if (data.status === "success") {
                setSnackbarmessage(`User with ID ${userId} deleted successfully!`);
                setSnackbaropen(true);

                // ✅ Ensure proper comparison (string vs number safe)
                setFilteredEnquiryData((prevData) =>
                    prevData.filter((row) => Number(row.id) !== Number(userId))
                );
                setEnquirydata((prevData) =>
                    prevData.filter((row) => Number(row.id) !== Number(userId)))
                } else {
                setSnackbarmessage(data.message || "Deletion failed.");
                setSnackbaropen(true);
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                setSnackbarmessage("An error occurred while deleting the user.");
                setSnackbaropen(true);
            } finally {
                setLoading(false); // ✅ Always stop loading
            }
            };


    // Delete the Enquiry

     //handle Logout 
     const handleLogout = () => {
       
        sessionStorage.clear();
        router.push('/admin');
      };
    // Delete the Contact
 const deleteRecord = async (id) => {
  try {
    const base = process.env.NEXT_PUBLIC_SCRIPT_CONTACT_DELETE_BY_ID.replace(/\/+$/, "");
    const url = `${base}/${id}`;

    const response = await fetch(url, { method: "DELETE" });
    const result = await response.json();

    if (result.status === "success") {
      setSnackbarmessage(result.message);
      setSnackbaropen(true);

      // 🔥 Update UI immediately
      setFilteredContactData(prev =>
        prev.filter((row) => String(row.id) !== String(id))
      );

      // Also update main list so table fallback also updates
      setContactdata(prev =>
        prev.filter((row) => String(row.id) !== String(id))
      );

    } else {
      setSnackbarmessage(result.message);
      setSnackbaropen(true);
    }
  } catch (error) {
    console.error("Error deleting record:", error);
    setSnackbarmessage("Something went wrong. Please try again.");
    setSnackbaropen(true);
  }
};


// Load popup entries
const loadPopupEntries = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_SCRIPT_SERVICES_POPUP_GET);
    const data = await res.json();
    setPopupFormEntries(data.data || []);
  } catch (error) {
    console.error('Load entries error:', error);
  }
};

React.useEffect(() => {
  loadPopupEntries();
}, []);

// Delete popup record
const deletePopupRecord = async (id) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SCRIPT_SERVICES_POPUP_DELETE_BY_ID,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Number(id) }),
      }
    );

    const result = await response.json();

    if (result.status==="success") {
      alert("deleted successfully");
      // ✅ Re-fetch data after successful deletion
     loadPopupEntries();
    } else {
      alert(result.message || "Deletion failed.");
    }
  } catch (error) {
    console.error("Delete error:", error);
    alert("An error occurred while deleting.");
  }
};





    // Delete the Contact
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Handle Blog
    const handleChange = (e) => {
        const { id, value } = e.target; // Use `id` to identify the input
        setFormData({ ...formData, [id]: value });
    };
   //   handle edit
    // Handle Blog
    const handleEdit = (e) => {
        const { id, value } = e.target; // Use `id` to identify the input
        setFormContent({ ...formContent, [id]: value });
    }; 
    // handle edit paragraph array in edit post start
    const handleEditArray = (index, newValue) => {
        const updatedArray = [...formContent.Description]; // Create a copy of the array
        updatedArray[index] = newValue; // Update the specific element
        setFormContent((prevFormContent) => ({
            ...prevFormContent, // Keep other parts of the object intact
            Description: updatedArray // Update only the Description field
          }));
      };
     // handle edit paragraph array in edit post end
// handle edit image

const handleImageEdit = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormContent({ ...formContent, Image: reader.result.split(',')[1] }); // Extract Base64 data
        };
        reader.readAsDataURL(file); // Convert image to Base64
    }
};

    

    const handleblog = async (e) => {
        e.preventDefault();
        setBlogOpen(false);
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_SCRIPT_BLOGS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.success) {
                alert('Blog post added successfully!');
                setFormData({
                    Category: '',
                    Tag: '',
                    Author: '',
                    Image: '',
                    Title: '',
                    Description: '',
                });
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        }
    };

    
    // Handle Blog

    //handle file document start
    const handleFileChange = async (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (!file) return;

        try {
            
            setSelectedFile(file); // Store converted HTML content
            
        } catch (error) {
            console.error("Error converting file:", error);
            alert("Failed to process file.");
        }
    };

   
      
      
    //handle file document end 

    //handle submit file start
    const handleFileSubmit = async () => {
        // Check if both selectedFile (document) and image are provided
        if (!selectedFile || !image) {
            alert("Please provide both an image and a document.");
            return;
        }
    
        try {
            // Convert the document file to HTML using Mammoth
            const documentHTML = await convertDocumentToHTML(selectedFile);
            
            // Convert the image file to a base64 string
            const imageBase64 = await convertImageToBase64(image);
             console.log("document string"+documentHTML);
             console.log("image string"+imageBase64);
            // Prepare the data to send in the POST request
            const data = {
                title:blogtitle,
                document: documentHTML, // HTML content from the document
                image: imageBase64,   // Base64 string of the image
            };

    
            // Log data for debugging
            console.log(data);
    
            // Make POST request with JSON data
            const response = await fetch(process.env.NEXT_PUBLIC_SCRIPT_BLOGS, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', // Send as JSON
                },
                body: JSON.stringify(data), // Send the JSON body
            });
    
            const result = await response.json(); // Parse the response
    
            if (response.ok) {
                alert("Blog post added successfully!");
                setSelectedFile(null); // Clear input for document
                setImage(null); // Reset image
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while submitting the form.");
        }
    
        setBlogOpen(false); // Close the blog modal or form
        setBlogTitle("");
    };
    

    // const handleProjectSubmit = async () => {
    //     if (!projectImage || !projectContent || !projectUrl) {
    //         alert("Please provide an image, content, and a URL.");
    //         return;
    //     }

    //     try {
    //         const imageBase64 = await convertImageToBase64(projectImage);

    //         console.log("our projects image",imageBase64);
    //         const base64Only = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    //             const data = {
    //                 image: base64Only,  
    //                 content: projectContent,
    //                 url: projectUrl,
    //             };

    //         console.log(data);

    //         const response = await fetch('https://collectintel.in/ourprojects.php', {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data),
    //         });

    //         const result = await response.json();

    //         if (response.ok) {
    //             alert("Project added successfully!");
    //             setProjectImage(null);
    //             setProjectContent("");
    //             setProjectUrl("");
    //         } else {
    //             alert(`Error: ${result.message}`);
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //         alert("An error occurred while submitting the project.");
    //     }
    //     setBlogOpen(false); 
    // };

    

    // const handleProjectSubmit = async () => {
    //     if (!projectImage || !projectContent || !projectUrl) {
    //         alert("Please provide an image, content, and a URL.");
    //         return;
    //     }
    
    //     try {
    //         const data = {
    //             image: projectImage,
    //             content: projectContent,
    //             url: projectUrl,
    //         };
    
    //         console.log("Submitting project data:", data);
    
    //         const response = await fetch('https://collectintel.in/ourprojects.php', {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data),
    //         });
    
    //         const result = await response.json();
    
    //         if (response.ok) {
    //             alert("Project added successfully!");
    //             setProjectImage("");
    //             setProjectContent("");
    //             setProjectUrl("");
    
                
    //         } else {
    //             alert(`Error: ${result.message}`);
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //         alert("An error occurred while submitting the project.");
    //     }
    
    //     setBlogOpen(false);
    // };
    

 const handleProjectSubmit = async () => {
    if (!projectImage || !projectContent || !projectUrl) {
        alert("Please provide an image, content, and a URL.");
        return;
    }

    const formData = new FormData();
    formData.append("image", projectImage);
    formData.append("content", projectContent);
    formData.append("url", projectUrl);

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_SCRIPT_SERVICES_PROJECTS_ADD, {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        if (response.ok) {
            alert("Project added successfully!");

            // ⬇️ ADD PROJECT TO UI IMMEDIATELY
            const newProject = {
                id: result.id,                     // backend must return new ID
                logo_url: result.logo_url,         // returned file path
                content: projectContent,
                url: projectUrl,
            };

            setProjectsdata((prev) => [newProject, ...prev]);

            // reset form
            setProjectImage(null);
            setProjectContent("");
            setProjectUrl("");
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while submitting the project.");
    }

    setBlogOpen(false);
};

    
    



    // Convert document (Word file) to HTML using Mammoth
    const convertDocumentToHTML = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = async (e) => {
                try {
                    const arrayBuffer = e.target.result;
                    const htmlContent = (await Mammoth.convertToHtml({ arrayBuffer })).value;
                    resolve(htmlContent); // Return only the HTML string
                } catch (err) {
                    reject("Error converting document to HTML: " + err.message);
                }
            };
            
            reader.onerror = (err) => {
                reject("Error reading document file: " + err.message);
            };
    
            reader.readAsArrayBuffer(file); // Read file as ArrayBuffer
        });
    };

    // email submit
    const handleEmailSubmit = async () => {
        if (!emailData.emailImage) {
            alert("Please select an image.");
            return;
        }
    
        if (!emailData.emailContent.trim()) {
            alert("Please enter email content.");
            return;
        }
    
        if (!recipientEmail.trim()) {
            alert("Please enter a recipient email.");
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append("client_name", emailData.emailTitle);
            formData.append("email_content", emailData.emailContent);
            formData.append("image", emailData.emailImage); // Store full Base64 string
            formData.append("recipient_email", recipientEmail);
    
            const response = await fetch(process.env.NEXT_PUBLIC_SCRIPT_EMAIL_TEMPLATE, {
                method: "POST",
                body: formData,
            });
    
            const result = await response.json();
            console.log("Email template response:", result);
    
            if (response.ok) {
                alert("Email template saved successfully!");
    
                // ✅ Now send the email
                const emailResponse = await fetch("https://collectintel.in/mailproxy.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ recipient_email: recipientEmail }),
                });
    
                const emailResult = await emailResponse.json();
                console.log("Send Email Response:", emailResult);
    
                if (emailResponse.ok) {
                    alert("Email sent successfully to " + recipientEmail);
                } else {
                    alert("Error sending email: " + emailResult.message);
                }
    
                // ✅ Reset form
                setEmailData({
                    emailImage: null,
                    emailTitle: "",
                    emailContent: ""
                });
                setRecipientEmail("");
    
            } else {
                alert(`Error: ${result.message}`);
            }
    
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while submitting the form.");
        }
    };
    // email submit
    
    
    // Convert image file to base64 string
    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = () => {
                resolve(reader.result); // Return the base64 string
            };
            
            reader.onerror = (err) => {
                reject("Error reading image file: " + err.message);
            };
            
            reader.readAsDataURL(file); // Read file as base64
        });
    };
    //handle submit file end


    const handleEditBlog = async (formContent) => {
    console.log(formContent);
    const strData=formContent.Description.join(" ");
        try {
            // const obj=getJsonObject();
            const response = await fetch(process.env.NEXT_PUBLIC_SCRIPT_EDITBLOG, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id:formContent.Id,
                    category:formContent.Category,
                    title:formContent.Title,
                    image:formContent.Image,
                    author:formContent.Author,
                    tag:formContent.Tag,
                    description:strData
                }),
            });
             console.log("edit description data",formContent.Description);
            const result = await response.json();
            if (result.success) {
                alert('Blog post edited  successfully!');
                setFormContent({
                    Category: '',
                    Tag: '',
                    Author: '',
                    Image: '',
                    Title: '',
                    Description: [],
                });
                setEditData(false);
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        }
    };


    // Handle Blog

    // edit blog function starts here 
   // Ensure this is inside an async function
const editBlog = async (idValue) => {
    var id=idValue;
    
    try {
        setEditData(true);
        console.log(id);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BLOG_API_URL}?id=${id}`, {
            method: 'GET', // Ensure you're using the PUT method
            headers: {
                'Content-Type': 'application/json', // The server expects JSON
                // Optional, if you need an authorization token
            }
            // body: JSON.stringify({  id:id}), // Send the id as a JSON payload
        });
        console.log(response);
        const result = await response.json();
        console.log(result);
        if (result.success === true) {
            console.log('Blog post edited  successfully!');
            setFormContent({
                Id:result.data.id,
                Category:result.data.Category,
                Title:result.data.Title,
                Author:result.data.Author,
                Image:result.data.Image,
                Tag:result.data.Tag,
              
                Description:result.data.Description.match(/(<([a-zA-Z][a-zA-Z0-9]*)[^>]*>.*<\/\2>)|([^<]+)/gs)
                
            })
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.log('Request failed:', error);
    }
    console.log(formContent.Description);
    // const splitData=formContent.Description.match(/<[^>]+>[^<]*<\/[^>]+>/g);
    // const validSplitData = splitData || [];
    // setSplitArray([...validSplitData]);
    // console.log("edit data"+splitArray);
};


      


    // edit blog function ends here 


    // Recieving Blog
    React.useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_SCRIPT_GETBLOGS)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setBlogdata(data.data);
                    console.log("blog data"+blogdata);
                   
                }
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [])

    React.useEffect(() => {
        console.log("Updated projects data:", blogdata);
    }, [blogdata]); // ✅ Logs only when data updates
    
    // Recieving Blog


     // Recieving Projects Details start
     React.useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_SCRIPT_SERVICES_PROJECTS_GET)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setProjectsdata(data.data);
                    // console.log("blog data"+projectsdata)
                }
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    
    React.useEffect(() => {
        console.log("Updated projects data:", projectsdata);
    }, [projectsdata]); // ✅ Logs only when data updates
    

    // Recieving Projects Details end here

    // Deleting Blog
  const deleteblog = async (IDvalue) => {
    const id = IDvalue;
    if (!id) {
        alert("Invalid blog ID");
        return;
    }

    try {
        console.log("Deleting Blog ID:", id);

        // Remove trailing slash from base URL (safe)
        const base = String(process.env.NEXT_PUBLIC_SCRIPT_DELETEBLOG || "").replace(/\/+$/, "");
        const url = `${base}/${id}`; // Correct final URL

        const response = await fetch(url, {
            method: 'DELETE', // DELETE should not send body
        });

        const result = await response.json();
        console.log("Delete blog response:", result);

        // Accept both boolean and string
        if (result.success === true || result.success === 'true') {
            alert('Blog post deleted successfully!');

            // Update UI immediately
            if (typeof setBlogdata === "function") {
                setBlogdata((prev) =>
                    Array.isArray(prev)
                        ? prev.filter((b) => String(b.id) !== String(id))
                        : prev
                );
            }
        } else {
            alert(result.message || 'Delete failed.');
        }
    } catch (error) {
        console.error("Delete Blog Error:", error);
        alert("An error occurred while deleting the blog post.");
    }
};


 const deleteProject = async (IDvalue) => {
    const id = IDvalue;
    if (!id) {
        alert("Invalid project ID");
        return;
    }

    try {
        console.log("Deleting ID:", id);

        // ensure base URL doesn't end with a slash to avoid double slashes
        const base = String(process.env.NEXT_PUBLIC_SCRIPT_SERVICES_PROJECTS_DELETE_BY_ID || "").replace(/\/+$/, "");
        const url = `${base}/${id}`;

        const response = await fetch(url, {
            method: 'DELETE',
            // no body for DELETE (keep headers minimal)
        });

        const result = await response.json();
        console.log("Delete response:", result);

        // accept both boolean true and string "true"
        if (result.success === true || result.success === 'true') {
            alert('Project deleted successfully!');

            // update UI immediately (keeps your existing state name)
            if (typeof setProjectsdata === "function") {
                setProjectsdata((prev) => Array.isArray(prev) ? prev.filter(p => String(p.id) !== String(id)) : prev);
            }
        } else {
            alert(result.message || 'Delete failed.');
        }
    } catch (error) {
        console.error("Delete error:", error);
        alert("An error occurred while deleting the project.");
    }
};


    // Deleting Blog
     
    
    // Blog Enlarger
    const BlogEnlarge = (ID) => {
        const blogid = ID;
        const controller = new AbortController();
        const signal = controller.signal;

        // Set a timeout of 3000ms to abort the request
        const timeout = setTimeout(() => {
            controller.abort();
            console.error('Fetch request timed out');
        }, 5000);

        const apiUrl = process.env.NEXT_PUBLIC_BLOG_API_URL;
        fetch(`${apiUrl}?id=${blogid}`, { signal })
            .then((response) => response.json())
            .then((data) => {
                clearTimeout(timeout); // Clear the timeout if the request completes in time
                if (data.success) {
                    setBlodModaldata(data.data);
                }
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    console.error('Fetch aborted due to timeout');
                } else {
                    console.error('Error fetching data:', error);
                }
            });

        setBlogModal(true);
    }

    // Blog Enlarger


 

     // Function to add a new paragraph
  const addParagraph = () => {
    setParagraphs([...paragraphs, { text: '', isEditable: true }]);
    console.log("add paragraph"+paragraphs);
  };

  // Function to handle the text change in the input field
  const handleTextChange = (e) => {
    setCurrentText(e.target.value);
  };

  // Function to save the edited paragraph
  const saveParagraph = () => {
    if (isEditing) {
      const updatedParagraphs = paragraphs.map((para, index) => 
        index === editIndex ? { ...para, text: currentText, isEditable: false } : para
      );
      console.log("updated paragraph"+updatedParagraphs);
      
      setParagraphs(updatedParagraphs);
      setIsEditing(false);
      setEditIndex(null);
     
    } else {
      setParagraphs([...paragraphs, { text: currentText, isEditable: false }]);
      
    }
    
    setCurrentText('');
    const textArray = paragraphs.map((para) => para.text); // Extract text values
    //formContent.Description=textArray;
    // console.log("formCntent Data"+formContent.Description);
    const textString = textArray.join(" ");
//       console.log("para"+paragraphs);
//       var r="";
//       for(var i=0;i<=paragraphs.length;i++)
//       {
//           r+=Array[i].text;
//       }
    console.log("string "+textString);
    formData.Description+=textString;
    console.log("form description data"+formData.Description);
    console.log(formData.Description);
    
  };

  const getJsonObject = () => {
    // Combine paragraphs into a single JSON object
    const jsonObject = paragraphs.reduce((obj, para, index) => {
      obj[`paragraph${index + 1}`] = para.text;
      return obj;
    }, {}); // Initial value is an empty object

    console.log(jsonObject); // Display the JSON object
    return jsonObject;
  };

 
  

  // Function to enable editing of an existing paragraph
  const enableEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setCurrentText(paragraphs[index].text);
   
  };

  // Function to handle delete paragraph
  const deleteParagraph = (index) => {
    const updatedParagraphs = paragraphs.filter((_, idx) => idx !== index);
    setParagraphs(updatedParagraphs);
  };


 const  handleTitleChange=(e)=>{
   const text=e.target.value;
    setBlogTitle(text);
 }
    
    return (
        <>
            <Snackbar
                open={sanckbaropen}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackbarmessage}
                action={action}
            />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" className='bg-white' open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                                color: "black"
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <img src='/images/logos/RV_logo_white.png' style={{ width: "150px", height: "100px" }} alt='ridgevedalogo' />
                        <div className="ms-auto">
                            <Button variant='contained' sx={{ backgroundColor: "red" }} onClick={handleLogout}><LogoutIcon /> Logout </Button> 
                        </div>
                    </Toolbar>

                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {['Dashboard', 'Projects','Services','Testimonials', 'Blog','Mail'].map((text) => {
                            // Define the icon mapping
                            const iconMapping = {
                                Dashboard: <DashboardIcon />,
                                Projects: <EngineeringIcon />,
                                Services: <BuildIcon />,
                                Testimonials: <StarIcon />,
                                Blog: <ArticleIcon />,
                                Mail: <MailIcon />,
                            };

                            return (
                                <ListItem key={text} disablePadding sx={{ display: 'block', marginTop: "10px" }}>
                                    <ListItemButton
                                        onClick={() => setContent(text)} // Update content on click
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {iconMapping[text]} {/* Render icon based on text */}
                                        </ListItemIcon>
                                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            );

                        })}
                        <hr />
                        {['Enquiry','Carrer','PopupForm'].map((text) => {
                            // Define the icon mapping
                            const iconMapping = {
                                Carrer: <ContactsIcon />,
                                Enquiry: <ContactSupportIcon />,
                                PopupForm: <OpenInNewIcon />
                            };

                            return (
                                <ListItem key={text} disablePadding sx={{ display: 'block', marginTop: "10px" }}>
                                    <ListItemButton
                                        onClick={() => setContent(text)} // Update content on click
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {iconMapping[text]} {/* Render icon based on text */}
                                        </ListItemIcon>
                                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {/* Conditionally render content based on the state */}
                    {content === 'Dashboard' && (
                        <>
                            <Typography>Dashboard Content</Typography>
                        </>
                    )}

                     {content === 'Projects' &&  (
                                                <>
                                                    <Typography variant="h4">Our Projects</Typography>
                                                    <div className='container-fluid mt-5'>
                                                        <div className="row">
                                                            <div className='col-12'>
                                                                <Typography variant='h4'>Projects</Typography>
                                                                <div className='text-end'>
                                                                    <Button variant='contained' onClick={() => setBlogOpen(true)}><AddCircleIcon />  Add Project</Button>
                                                                </div>
                                                                <Modal
                                                                    open={blogopen}
                                                                    onClose={() => setBlogOpen(false)}
                                                                    aria-labelledby="modal-modal-title"
                                                                    aria-describedby="modal-modal-description"
                    
                                                                >
                                                                    <Box sx={style}>
                                                                       
                                                                       
                    
                                                                    <Typography variant="h6" sx={{ marginTop: "15px", fontWeight: "bold" }}>
                                                                        Enter Website Logo
                                                                    </Typography>
                                                                    <input 
                                                                        type="file" 
                                                                        accept=".jpg,.png,.jpeg" 
                                                                        onChange={handleProjectImageChange} 
                                                                        className="btn mb-2"
                                                                    /> 
                                                                    
                                                                    <Typography variant="h6" sx={{ marginTop: "15px", fontWeight: "bold" }}>
                                                                        Enter Website Content
                                                                    </Typography>
                                                                    <input 
                                                                            type="text" 
                                                                            onChange={handleProjectsContentChange} 
                                                                            className="btn mb-3 border border-black ml-2"
                                                                            style={{ width: '100%' }} // Set the width to 100%
                                                                            placeholder="Enter text"
                                                                            />
                    
                                                                    <br/>
                                                                    {/* <Typography variant="h6" sx={{ marginTop: "15px", fontWeight: "bold" }}>
                                                                        Enter Website Url
                                                                    </Typography> */}
                                                                    <input 
                                                                            type="text" 
                                                                            onChange={handleProjectsUrlChange} 
                                                                            className="btn mb-3 border border-black ml-2"
                                                                            style={{ width: '100%' }} // Set the width to 100%
                                                                            placeholder="Enter text"
                                                                            />
                    
                                                                    <br/>
                                                                
                    
                                                                        <div className='mt-3 text-end'>
                                                                            <Button variant='text' className='text-danger' onClick={() => setBlogOpen(false)}>Cancel</Button>
                                                                            <Button variant='text' className='ms-2 text-primary' onClick={handleProjectSubmit}>Add Project</Button>
                                                                        </div>
                                                                    </Box>
                                                                </Modal>
                                                            </div>
                                                            {projectsdata && projectsdata.length > 0 ? (
                                                                <Grid container spacing={2}>
                                                                    {projectsdata.map((project, index) => (
                                                                        <Grid 
                                                                            item 
                                                                            xs={12}  // 1 item per row on mobile
                                                                            sm={6}   // 2 items per row on tablets
                                                                            md={4}   // 3 items per row on laptops
                                                                            lg={3}   // 4 items per row on desktops
                                                                            key={index}
                                                                        > 
                                                                            <Card sx={{ width: '100%', marginBottom: 2, display: 'flex', flexDirection: 'column' }}>
                                                                                <CardContent sx={{ flex: 1, overflow: 'hidden' }}>
                                                                                   {/* { console.log("IMAGE PATH:", project.logo_url)} */}

                                                                                    {/* Image Handling: SVG or other formats */}
                                                                                   {project.logo_url?.endsWith(".png") ? (
    <img
        src={`${process.env.NEXT_PUBLIC_API_MAIN_URL}${project.logo_url}`}

        alt="Project Logo"
        width="100%"
        height="200"
        style={{ objectFit: "cover" }}
    />
) : (
    <Box
        component="img"
        src={`${process.env.NEXT_PUBLIC_API_MAIN_URL}${project.logo_url}`}
        alt="Project Image"
        sx={{ width: "100%", height: "200px", borderRadius: 2 }}
    />
)}



                                                                                    {/* Project Content */}
                                                                                    <Typography 
                                                                                        variant="h6" 
                                                                                        sx={{ paddingTop: "10px", fontSize: "20px", color: "#111", fontWeight: "bold" }}
                                                                                    >
                                                                                        {project.content}
                                                                                    </Typography>

                                                                                    {/* Project URL */}
                                                                                    <Typography 
                                                                                        variant="body1" 
                                                                                        sx={{ paddingTop: "5px", fontSize: "16px", color: "blue", fontWeight: "bold" }}
                                                                                    >
                                                                                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                                                                                            Visit Project
                                                                                        </a>
                                                                                    </Typography>
                                                                                    
                                                                                </CardContent>

                                                                                {/* Delete Button */}
                                                                                <div className="text-left">
                                                                                    <Button
                                                                                        variant="text"
                                                                                        onClick={() => {
                                                                                            console.log("Deleting Project ID:", project.id);
                                                                                            deleteProject(project.id);
                                                                                        }}
                                                                                    >
                                                                                        <DeleteIcon sx={{ color: "red", fontSize: "25px", textAlign: "center", padding: "2px" }} />
                                                                                    </Button>     
                                                                                </div>

                                                                            </Card>
                                                                        </Grid>
                                                                    ))}
                                                                </Grid>
                                                            ) : (
                                                                <Typography variant="h6" component="div">No Projects available</Typography>
                                                            )}

                    
                                                           
                                                        </div>
                                                    </div>
                                                </>
                                            )} 
                    

                    {content === 'Services' && <Typography variant="h4">Services Content</Typography>}
                    {content === 'Testimonials' && <Typography variant="h4">Testimonials Content</Typography>}
                    {content === 'Blog' &&
                        (
                            <>
                                <Typography variant="h4">Blog Content</Typography>
                                <div className='container-fluid mt-5'>
                                    <div className="row">
                                        <div className='col-12'>
                                            <Typography variant='h4'>Blogs</Typography>
                                            <div className='text-end'>
                                                <Button variant='contained' onClick={() => setBlogOpen(true)}><AddCircleIcon />  Add Blog</Button>
                                            </div>
                                            <Modal
                                                open={blogopen}
                                                onClose={() => setBlogOpen(false)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"

                                            >
                                                <Box sx={style}>
                                                   
                                                   

                                                <Typography variant="h6" sx={{ marginTop: "15px", fontWeight: "bold" }}>
                                                    Upload Image
                                                </Typography>
                                                <input 
                                                    type="file" 
                                                    accept=".jpg,.png,.jpeg" 
                                                    onChange={handleImageChange} 
                                                    className="btn mb-2"
                                                /> 
                                                
                                                <Typography variant="h6" sx={{ marginTop: "15px", fontWeight: "bold" }}>
                                                    Enter Title
                                                </Typography>
                                                <input 
                                                        type="text" 
                                                        onChange={handleTitleChange} 
                                                        className="btn mb-3 border border-black ml-2"
                                                        style={{ width: '100%' }} // Set the width to 100%
                                                        placeholder="Enter text"
                                                        />

                                                <br/>
                                                  
                                             <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
                                                    Upload File
                                                </Typography>

                                                {/* File Input */}
                                                <input 
                                                    type="file" 
                                                    accept=".docx,.pdf,.txt,.jpg,.png" 
                                                    onChange={handleFileChange} 
                                                    className="btn mb-2"
                                                /> 


                                                    <div className='mt-3 text-end'>
                                                        <Button variant='text' className='text-danger' onClick={() => setBlogOpen(false)}>Cancel</Button>
                                                        <Button variant='text' className='ms-2 text-primary' onClick={handleFileSubmit}>Add Blog</Button>
                                                    </div>
                                                </Box>
                                            </Modal>
                                        </div>
                                        {blogdata && blogdata.length > 0 ? (
                                           
                                           <Grid container spacing={2}>
                                           {blogdata.map((value, index) => (
                                               <Grid 
                                                   item 
                                                   xs={12}  // 1 item per row on mobile
                                                   sm={6}   // 2 items per row on tablets
                                                   md={4}   // 3 items per row on laptops
                                                   lg={4}   // 4 items per row on desktops
                                                   key={index}
                                               > 
                                                   <Card sx={{ width: '100%', marginBottom: 2, display: 'flex', flexDirection: 'column' }}>
                                                       <CardContent sx={{ flex: 1, overflow: 'hidden' }}>
                                                           <Box
                                                               component="img"
                                                               src={value.image}
                                                               alt="Base64 Image"
                                                               sx={{ width: "100%", height: "200px", borderRadius: 2 }}
                                                           />
                                                           <Typography variant="h6" sx={{ paddingTop: "10px", fontSize: "25px", color: "#111", fontWeight: "bold",marinBottom:'10px' }}>
                                                               {value.title}
                                                           </Typography>
                                                           <div
                                                               dangerouslySetInnerHTML={{ __html: value.document }}
                                                               style={{
                                                                   overflowY: 'auto',
                                                                   maxHeight: '200px',
                                                                   paddingRight: '10px',
                                                                   paddingTop: '25px',
                                                                   height:'200px',
                                                               }}
                                                           />
                                                       </CardContent>
                                                       <div className='text-left'>
                                                           <Button
                                                               variant='text'
                                                               onClick={() => {
                                                                   console.log("Deleting Blog ID:", value.id);
                                                                   deleteblog(value.id);
                                                               }}
                                                           >
                                                               <DeleteIcon sx={{ color: "red", fontSize: "25px", textAlign: "center", padding: "2px" }} />
                                                           </Button>     
                                                       </div>
                                                   </Card>
                                               </Grid>
                                           ))}
                                       </Grid>
                                       
                                            
                                        ) : (
                                            <Typography variant="h6" component="div">No blogs available</Typography>
                                        )}
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {content=== 'Mail' && (
                        <>
                        <Typography variant="h4">Email Template</Typography>
                                <div className='container-fluid mt-5'>
                                    <div className="row">
                                        <div className='col-12'>
                                            <Typography variant='h4'>Email</Typography>
                                            <div className='text-end'>
                                                <Button variant='contained' onClick={() => setBlogOpen(true)}><AddCircleIcon />  Add Email</Button>
                                            </div>
                                            <Modal
                                                open={blogopen}
                                                onClose={() => setBlogOpen(false)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"

                                            >
                                                <Box sx={style}>
                                                   
                                                   

                                                <Typography variant="h6" sx={{ marginTop: "15px", fontWeight: "bold" }}>
                                                    Upload Image
                                                </Typography>
                                                <input 
                                                    type="file" 
                                                    accept=".jpg,.png,.jpeg" 
                                                    onChange={handleEmailImageChange} 
                                                    className="btn mb-2"
                                                /> 
                                                
                                                <Typography variant="h6" sx={{ marginTop: "15px", fontWeight: "bold" }}>
                                                    Enter Client Name
                                                </Typography>
                                                <input 
                                                        type="text" 
                                                        onChange={handleEmailTitleChange} 
                                                        value={emailData.emailTitle}
                                                        className="btn mb-3 border border-black ml-2"
                                                        style={{ width: '100%' }} // Set the width to 100%
                                                        placeholder="Enter text"
                                                        />

                                                <br/>

                                                <Typography variant="h6" sx={{ marginTop: "15px", fontWeight: "bold" }}>
                                                    Enter Recipient Email
                                                </Typography>
                                                <input 
                                                    type="email" 
                                                    placeholder="Enter recipient email" 
                                                    value={recipientEmail} 
                                                    onChange={(e) => setRecipientEmail(e.target.value)}
                                                    className="btn mb-3 border border-black ml-2"
                                                    style={{ width: '100%' }}
                                                />

                                                  
                                               <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
                                                    Upload Content
                                                </Typography>

                                                
                                                
                                                  <textarea
                                                        value={emailData.emailContent}
                                                        onChange={handleEmailContentChange}
                                                        placeholder="Type something..."
                                                        style={{
                                                        width: "100%",
                                                        height: "150px",
                                                        padding: "10px",
                                                        fontSize: "16px",
                                                        borderRadius: "5px",
                                                        border: "1px solid #ccc",
                                                        }}
                                                    />


                                                    <div className='mt-3 text-end'>
                                                        <Button variant='text' className='text-danger' onClick={() => setBlogOpen(false)}>Cancel</Button>
                                                        <Button variant='text' className='ms-2 text-primary' onClick={handleEmailSubmit}>Add Email</Button>
                                                    </div>
                                                </Box>
                                            </Modal>
                                        </div>
                                        </div>
                                        </div>
                        </>
                    )}
                 {content === 'Enquiry' && (
    <>
        <div 
            className='container-fluid' 
            style={{ 
                paddingLeft: '15px', 
                paddingRight: '15px', 
                maxWidth: '100%', 
                width: '100%',
                margin: 'auto'
            }}
        >
            <div className='row justify-content-center'>
                <div className='col-12 text-center'>
                    <Typography variant='h4'>Contact Data</Typography>
                </div>
                <div className='col-12'>
                    <div 
                        style={{ 
                            marginBottom: '20px', 
                            display: "flex", 
                            flexDirection: "column",  
                            gap: "10px", 
                            marginTop: "20px" 
                        }}
                    >
                        <TextField
                            value={contactnameFilter}
                            onChange={(e) => setContactNameFilter(e.target.value)}
                            label="Filter by Name"
                            variant="standard"
                            type='text'
                            fullWidth
                        />
                        <TextField
                            value={contactemailFilter}
                            onChange={(e) => setContactEmailFilter(e.target.value)}
                            label="Filter by Email"
                            variant="standard"
                            type='email'
                            fullWidth
                        />
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            <Button variant="contained" onClick={ContacthandleSearch} >Search</Button>
                            <Button variant="contained" className='bg-warning' onClick={handleReset}>Reset</Button>
                            <Button
                                variant="contained"
                                onClick={handleGenerateCSV}
                                style={{ backgroundColor: "#4CAF50", color: "white" }}
                            >
                                Generate CSV
                            </Button>
                        </div>
                    </div>

                    <div style={{ overflowX: 'none' }}> 
                        <TableContainer 
                            component={Paper} 
                            style={{ 
                                backgroundColor: "#ECECEC", 
                                maxHeight: "100%",
                                width: '100%',
                                maxWidth: '100%',  
                                margin: 'auto'  
                            }}
                        >
                            <Table stickyHeader>
                                {/* Table Head */}
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email Address</TableCell>
                                        <TableCell>Mobile No</TableCell>
                                        <TableCell>Subject</TableCell>
                                        <TableCell>Message</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>

                                {/* Table Body */}
                             <TableBody>
  {(Array.isArray(filteredContactData) && filteredContactData.length > 0
    ? filteredContactData
    : Array.isArray(contactdata) ? contactdata : []
  ).map((row, index) => (
    <TableRow key={index}>
      <TableCell sx={{ fontSize: "12px" }}>{row.id}</TableCell>
      <TableCell sx={{ fontSize: "12px" }}>{row.Name}</TableCell>
      <TableCell sx={{ fontSize: "12px" }}>{row.Email}</TableCell>
      <TableCell sx={{ fontSize: "12px" }}>{row.Phone}</TableCell>
        <TableCell sx={{ fontSize: "12px" }}>{row.Subject}</TableCell>
      <TableCell sx={{ fontSize: "12px" }}>{row.Message}</TableCell>

      {/* <TableCell sx={{ fontSize: "12px" }}>
        <Button
          variant='contained'
          onClick={() => downloadResume(row.Resume, `${row.Name}_Resume.pdf`)}
        >
          Download
        </Button>
      </TableCell> */}

      <TableCell>
        <Button variant='text' onClick={() => deleteRecord(row.id)}>
          <DeleteIcon sx={{ color: "red", fontSize: "18px" }} />
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>


                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    </>
)}


                 {content === 'Carrer' && (
       <>
        {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <div className='card'>
                    <div className='card-body'>
                        <CircularProgress />
                    </div>
                </div>
            </div>
        ) : (
            <div className='container-fluid' style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                <div className='row'>
                    <div className='col-12 text-center'>
                        <Typography variant='h4'>Enquiry Data</Typography>
                    </div>
                    <div className='col-12'>
                        <div 
                            style={{ 
                                marginBottom: '20px', 
                                display: "flex", 
                                flexDirection: "column",  // Stack filters on mobile
                                gap: "10px", 
                                marginTop: "20px" 
                            }}
                        >
                            <TextField
                                label="Filter by Name"
                                value={nameFilter}
                                onChange={(e) => setNameFilter(e.target.value)}
                                variant="standard"
                                type='text'
                                fullWidth
                            />
                            <TextField
                                label="Filter by Email"
                                value={emailFilter}
                                onChange={(e) => setEmailFilter(e.target.value)}
                                variant="standard"
                                type='email'
                                fullWidth
                            />
                            <TextField
                                label=""
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                variant="standard"
                                type='date'
                                fullWidth
                            />
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                <Button variant="contained" onClick={handleSearch} >Search</Button>
                                <Button variant="contained" className='ms-2 bg-warning' onClick={resetFilters}>Reset</Button>
                                <Button
                                    variant="contained"
                                    onClick={handleGenerateEnquiryCSV}
                                    style={{ backgroundColor: "#4CAF50", color: "white" }}
                                >
                                    Generate CSV
                                </Button>
                            </div>
                        </div>

                        <div style={{ overflowX: 'auto' }}>  {/* Make table scrollable on small screens */}
                            <TableContainer 
                                component={Paper} 
                                style={{ 
                                    backgroundColor: "#ECECEC", 
                                    maxHeight: "100%",
                                    width: '100%',
                                    maxWidth: '100%',  // Control max width for mobile view
                                    margin: 'auto'    // Center the table
                                }}
                            >
                                <Table stickyHeader>
                                    {/* Table Head */}
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                          <TableCell>Contact</TableCell>

                                            <TableCell>Role</TableCell>
                                            <TableCell>Resume</TableCell>
                                            <TableCell>Created Date</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {/* Table Body */}
                      <TableBody>
  {(
    Array.isArray(filteredEnquiryData) && filteredEnquiryData.length > 0
      ? filteredEnquiryData
      : Array.isArray(enquirydata)
      ? enquirydata
      : []
  ).map((row, index) => (
    <TableRow key={index}>
      <TableCell sx={{ fontSize: "12px" }}>{row.id}</TableCell>
      <TableCell sx={{ fontSize: "12px" }}>{row.Name}</TableCell>
      <TableCell sx={{ fontSize: "12px" }}>{row.Email}</TableCell>
      <TableCell sx={{ fontSize: "12px" }}>{row.Contact}</TableCell>
      <TableCell sx={{ fontSize: "12px" }}>{row.Role}</TableCell>

     <TableCell sx={{ fontSize: "12px" }}>
    <Button
        variant="contained"
        onClick={() => {
        console.log("Resume Base64:", row.Resume);  // 👈 ADD THIS
        downloadResume(row.Resume, `${row.Name}_Resume.pdf`);
        }}
    >
        Download
    </Button>
    </TableCell>


      <TableCell sx={{ fontSize: "12px" }}>{row.created_at}</TableCell>

      <TableCell>
        <Button onClick={() => handleDelete(row.id)}>
          <DeleteIcon sx={{ color: "red", fontSize: "18px" }} />
        </Button>
      </TableCell>
    </TableRow>
  ))}

  {(
    (!Array.isArray(filteredEnquiryData) || filteredEnquiryData.length === 0) &&
    (!Array.isArray(enquirydata) || enquirydata.length === 0)
  ) && (
    <TableRow>
      <TableCell colSpan={6} align="center">
        No Data Available
      </TableCell>
    </TableRow>
  )}
</TableBody>




                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </div>
          )}
      </>
   )}


         {content === 'PopupForm' && (
    <>
        <div 
            className='container-fluid' 
            style={{ 
                paddingLeft: '15px', 
                paddingRight: '15px', 
                maxWidth: '100%', 
                width: '100%',
                margin: 'auto'
            }}
        >
            <div className='row justify-content-center'>
                <div className='col-12 text-center'>
                    <Typography variant='h4'>PopupForm Data</Typography>
                </div>
                <div className='col-12'>
                    <div 
                        style={{ 
                            marginBottom: '20px', 
                            display: "flex", 
                            flexDirection: "column",  
                            gap: "10px", 
                            marginTop: "20px" 
                        }}
                    >
                        <TextField
                            value={contactnameFilter}
                            onChange={(e) => setContactNameFilter(e.target.value)}
                            label="Filter by Name"
                            variant="standard"
                            type='text'
                            fullWidth
                        />
                        <TextField
                            value={contactemailFilter}
                            onChange={(e) => setContactEmailFilter(e.target.value)}
                            label="Filter by Email"
                            variant="standard"
                            type='email'
                            fullWidth
                        />
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            <Button variant="contained" onClick={ContacthandleSearch} >Search</Button>
                            <Button variant="contained" className='bg-warning' onClick={handleReset}>Reset</Button>
                            <Button
                                variant="contained"
                                onClick={handleGenerateCSV}
                                style={{ backgroundColor: "#4CAF50", color: "white" }}
                            >
                                Generate CSV
                            </Button>
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}> 
                        <TableContainer 
                            component={Paper} 
                            style={{ 
                                backgroundColor: "#ECECEC", 
                                maxHeight: "100%",
                                width: '100%',
                                maxWidth: '100%',  
                                margin: 'auto'  
                            }}
                        >
                            <Table stickyHeader>
                                {/* Table Head */}
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Full Name</TableCell>
                                        <TableCell>Email Address</TableCell>
                                        <TableCell>Mobile No</TableCell>
                                        <TableCell>Requirements</TableCell>
                                          <TableCell>Created At</TableCell>
                                         <TableCell>Delete</TableCell>
                                    </TableRow>
                                </TableHead>

                                {/* Table Body */}
                                <TableBody>
                                    {Array.isArray(popupformEntries) && popupformEntries.length > 0 ? (
                                       popupformEntries.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ fontSize: "12px" }}>{row.id}</TableCell>
                                                <TableCell sx={{ fontSize: "12px" }}>{row.full_name}</TableCell>
                                                <TableCell sx={{ fontSize: "12px" }}>{row.email}</TableCell>
                                                <TableCell sx={{ fontSize: "12px" }}>{row.mobile}</TableCell>
                                                <TableCell sx={{ fontSize: "12px" }}>{row.requirements}</TableCell>
                                                <TableCell sx={{ fontSize: "12px" }}>{row.created_at}</TableCell>
                                                <TableCell>
                                                    <Button 
                                                        variant='text' 
                                                        onClick={() => deletePopupRecord(row.id)}
                                                    >
                                                        <DeleteIcon sx={{ color: "red", fontSize: "18px" }} />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={11} align="center">
                                                No Data Available
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    </>
)}


                    { editData &&
                    (
                        <>
                            <Typography variant="h4">Blog Edit</Typography>
                            <div className='container-fluid mt-5'>
                                <div className="row">
                                    <div className='col-12'>
                                        
                                        <Modal
                                            open={editData}
                                            onClose={() => setEditData(false)}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"

                                        >
                                            <Box sx={style}>
                                                <Typography variant='h5' sx={{ fontWeight: "bold", marginBottom: "20px" }}>Edit Blog</Typography>
                                                <TextField id="Category" value={formContent.Category}
                                                    onChange={handleEdit} className='mb-2' type='text' label="Category" variant="outlined" fullWidth/>
                                                <br />
                                                <TextField id="Tag" className='mb-2' value={formContent.Tag}
                                                    onChange={handleEdit} type='text' label="Tag" variant="outlined" fullWidth/>
                                                <br />
                                                <TextField id="Author" className='mb-2' value={formContent.Author}
                                                    onChange={handleEdit} type='text' label="Author" variant="outlined" fullWidth/>
                                                <br />
                                                <input type='file' accept="image/*" onChange={handleImageEdit} className='btn mb-2' />
                                                <br />
                                                <TextField id="Title" className='mb-2' value={formContent.Title}
                                                    onChange={handleEdit} type='text' label="Title" variant="outlined" fullWidth/>
                                                <br />
                                                
                                                {
                                                 formContent.Description?.map((para,index)=>{
                                                      return (<TextField id="Description" className='mb-2' value={para} key={index}
                                                     onChange={(e)=>handleEditArray(index,e.target.value)} type='text' label="Description" variant="outlined" fullWidth rows={10} cols={55} />
                                                 )})
                                                }   
                                               
                                                <br />
                                                <div className='mt-3 text-end'>
                                                    <Button variant='text' className='text-danger' onClick={() => setEditData(false)}>Cancel</Button>
                                                    <Button variant='text' className='ms-2 text-primary' onClick={()=>handleEditBlog(formContent)}>update Blog</Button>
                                                </div>
                                            </Box>
                                        </Modal>
                                    </div>
                                   

                                    
                                </div>
                            </div>
                        </>
                    )
                     }

                   
                </Box>
            </Box>
        </>
    );
}