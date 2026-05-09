import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
} from '@mui/material';
import {
    EVENT_CATEGORIES,
    EVENT_CATEGORY_LABELS,
    EVENT_SORT_FIELDS,
    EVENT_SORT_LABELS,
    SORT_ORDER_LABELS,
    SORT_ORDERS,
} from '../constants/event.constants';
import { EventsFiltersState } from '../types/event-filters.types';

type EventsToolbarProps = {
    filters: EventsFiltersState;
    onChange: (filters: EventsFiltersState) => void;
    onReset: () => void;
};

export function EventsToolbar({
                                  filters,
                                  onChange,
                                  onReset,
                              }: EventsToolbarProps) {
    return (
        <Paper
            sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, minmax(0, 1fr))',
                        md: 'repeat(5, minmax(0, 1fr))',
                    },
                    gap: 2,
                }}
            >
                <FormControl fullWidth>
                    <InputLabel id="category-filter-label">Category</InputLabel>
                    <Select
                        labelId="category-filter-label"
                        label="Category"
                        value={filters.category}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                category: event.target.value as EventsFiltersState['category'],
                            })
                        }
                    >
                        <MenuItem value="ALL">All categories</MenuItem>

                        {EVENT_CATEGORIES.map((category) => (
                            <MenuItem key={category} value={category}>
                                {EVENT_CATEGORY_LABELS[category]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Date from"
                    type="date"
                    value={filters.dateFrom}
                    onChange={(event) =>
                        onChange({
                            ...filters,
                            dateFrom: event.target.value,
                        })
                    }
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />

                <TextField
                    label="Date to"
                    type="date"
                    value={filters.dateTo}
                    onChange={(event) =>
                        onChange({
                            ...filters,
                            dateTo: event.target.value,
                        })
                    }
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />

                <FormControl fullWidth>
                    <InputLabel id="sort-by-label">Sort by</InputLabel>
                    <Select
                        labelId="sort-by-label"
                        label="Sort by"
                        value={filters.sortBy}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                sortBy: event.target.value as EventsFiltersState['sortBy'],
                            })
                        }
                    >
                        {EVENT_SORT_FIELDS.map((field) => (
                            <MenuItem key={field} value={field}>
                                {EVENT_SORT_LABELS[field]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="order-label">Order</InputLabel>
                    <Select
                        labelId="order-label"
                        label="Order"
                        value={filters.order}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                order: event.target.value as EventsFiltersState['order'],
                            })
                        }
                    >
                        {SORT_ORDERS.map((order) => (
                            <MenuItem key={order} value={order}>
                                {SORT_ORDER_LABELS[order]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 2,
                }}
            >
                <Button variant="outlined" onClick={onReset}>
                    Reset filters
                </Button>
            </Box>
        </Paper>
    );
}