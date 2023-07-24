import * as React from "react"
import { Box, Button, Input, InputAdornment, Typography } from "@mui/material"
import { ReactComponent as SearchIcon } from "../../../images/svg/search.svg"


const SearchBar = (props: {
    handleFilter: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleOpenNewTaskModel: () => void
}) => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: {
                xs: "column",
                md: "row"
            },
            alignItems: "center",
            justifyContent: "space-between",
            margin: {
                xs: "29px 0 16px",
                md: "34px 0 10px"
            }
        }}>
            <Box>
                <Typography fontSize="20px" color="#537178">
                    Tasks
                </Typography>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: {
                    xs: "column",
                    md: "row"
                },
                padding: {
                    xs: "0 13px 0 15px",
                    md: "unset"
                },
                width: {
                    xs: "100%",
                    md: "unset"
                },
                maxWidth: "450px"
            }}>
                <Box sx={{
                    width: {
                        xs: "100%",
                        md: "244px"
                    }
                }}>
                    <Input
                        style={{
                            border: "none",
                            outline: "none",
                            background: "#D9DFEB",
                            borderRadius: "8px",
                            height: "40px",
                            width: "100%",
                            fontSize: "14px",
                            paddingLeft: "15px"
                        }}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon style={{
                                    marginRight: "9px"
                                }} />
                            </InputAdornment>
                        }
                        disableUnderline={true}
                        placeholder="Search by task name"
                        onChange={props.handleFilter}
                    />
                </Box>
                <Button
                    sx={{
                        textTransform: "unset",
                        height: "40px",
                        borderRadius: "8px",
                        width: {
                            md: "124px"
                        },
                        marginLeft: {
                            md: "12px"
                        },
                        marginTop: {
                            xs: "8px",
                            md: "unset"
                        },
                        backgroundColor: "#5285EC"
                    }}
                    variant="contained"
                    onClick={props.handleOpenNewTaskModel}
                >
                    + New Task
                </Button>
            </Box>
        </Box>
    )
}

export default SearchBar