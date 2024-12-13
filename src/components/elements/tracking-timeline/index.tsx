import React from "react";
import Icon from "./Icon";
import Line from './Line';

interface TrackingTimelineStatus {
    submitted: boolean;
    processing: boolean;
    accepted: boolean;
    rejected: boolean;
}

const TrackingTimeline: React.FC = () => {
    const [status, ] = React.useState<TrackingTimelineStatus>({
        submitted: false,
        processing: false,
        accepted: false,
        rejected: false
    });

    return (
        <div>
            <div className="flex items-center">            
            {/* Icon awal */}
                <Icon
                    text="Laporan dibuat"
                    border={status.submitted? 'border-none' : 'border border-slate-300'} 
                    textColor={status.submitted? 'text-white' : 'text-slate-600'}
                    bgColor={status.submitted? 'bg-orange-400' : 'bg-white'}
                    icon="bx-edit-alt"
                />

                {/* Garis pertama */} 
                <Line 
                    bgColor={status.processing ? 'bg-orange-400' : 'bg-slate-300'}
                />

                {/* Icon tengah - processing */}
                <Icon
                    text="Laporan diproses"
                    border={status.processing ? 'border-none' : 'border border-slate-300'} 
                    textColor={status.processing ? 'text-white' : 'text-slate-600'}
                    bgColor={status.processing ? 'bg-orange-400' : 'bg-white'}
                    icon="bx-smile"
                />

                {/* Garis kedua */}
                <Line 
                    bgColor={
                        status.accepted || status.rejected
                        ? 'bg-orange-400'
                        : 'bg-slate-300'
                    }
                />
                
                {/* Icon akhir */}
                <Icon
                    text={
                        status.accepted 
                        ? 'Laporan diterima' 
                        : status.rejected
                        ? 'Laporan ditolak'
                        : 'Laporan diterima/ditolak'}
                    border={
                        status.accepted || status.rejected                        
                        ? 'border-none'
                        : 'border border-slate-300'
                    }
                    textColor={
                        status.accepted || status.rejected
                        ? 'text-white'    
                        : 'text-slate-600'
                    }
                    bgColor={
                        status.accepted 
                        ? 'bg-orange-400' 
                        : status.rejected
                        ? 'bg-red-600'
                        : 'bg-white'
                    }
                    icon={
                        status.accepted 
                        ? 'bx-check' 
                        : status.rejected
                        ? 'bx-x'
                        : 'bx-check'
                    }
                />     
            </div>
        </div>        
    );
}

export default TrackingTimeline;