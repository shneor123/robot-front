import React from 'react'
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";

export const AddRemoveCart = ({ item, onRemoveCart, onAddToCart }) => {
    return (
        <ButtonGroup
            size="small"
            variant="outlined"
            aria-label="outlined button group"
        >
            <Button onClick={() => onRemoveCart(item)}>
                <RemoveIcon fontSize="small" />
            </Button>

            <Button disabled sx={{ p: 0, width: "auto" }}>
                <Typography
                    sx={{ color: "#757575", fontSize: 14, fontWeight: "small", m: 0 }}
                    variant="caption"
                    display="block"
                >
                    {item.qty}
                </Typography>
            </Button>

            <Button onClick={() => onAddToCart(item)}>
                <AddIcon fontSize="small" />
            </Button>
        </ButtonGroup>
    )
}
