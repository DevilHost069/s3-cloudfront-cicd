import { queryKeys } from "@shared/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axiosInstance";
import { IResponseMeta } from "@shared/types/common";


export type ISocialMediaLink = {
    platform: string;
    icon: string;
};

export type IEmailTemplate = {
    subject: string;
    body: string;
    footer: string;
};

export type IBrandingData = {
    support_email: string;
    primary_color: string;
    primary_light_color: string;
    background_color: string;
    background_image: string;
    text_color: string;
    font_family: string;
    logo: string;
    logo_text: string;
    fav_ico: string;
    header_text: string;
    custom_header_html: string;
    footer_text: string;
    copyright_text: string;
    social_media_links: ISocialMediaLink[];
    email_template: IEmailTemplate;
    sms_template: string;
};

export type IConfigurationData = {
    branding: IBrandingData
}

export type IConfigurationRes = {
    response: IResponseMeta;
    data: IConfigurationData
};

export type IConfiguration = {
    data: IConfigurationData | undefined;
    isError: boolean | undefined;
    isLoading: boolean | undefined;
    refetch?: () => Promise<any>;
};

async function getConfigurations(): Promise<IConfigurationRes | undefined> {
    try {
        const { data, status } = await axiosInstance({
            method: "GET",
            url: `/api/configurations/`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}

export function useGetConfigurations() {
    const fallback: IConfigurationRes | any = [];
    const {
        data = fallback,
        isError,
        isLoading,
    } = useQuery<IConfigurationRes, Error>({
        queryKey: [queryKeys.configurations],
        queryFn: () => getConfigurations(),
    });

    return { data, isError, isLoading };
}
