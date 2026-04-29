export const basicQuery = `
    id: documentId
    seo {
        title
        description
    }
    content {
        firstContent
        secondContent
        thirdContent
        fourthContent
        fifthContent
        sixthContent
        seventhContent
        eighthContent
        ninethContent
        tenthContent
    }
    faqs {
        id
        question
        answer
    }
    author {
        name
        image {
            url
        }
        description
        facebookProfile
        linkedinProfile
    }
    publishedAt
    updatedAt
`;

export const slotsQuery = `
    id:documentId
    title
    slug
    logo {
        url
    }
    provider {
        title
    }
    slotThemes {
        slug
        iconId
    }
`;

export const roulettesQuery = `
    id:documentId
    title
    slug
    logo {
        url
    }
    provider {
        title
    }
    rouletteMechanic {
        slug
        iconId
    }
`;
