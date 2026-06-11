export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  source: string;
  created_at: string;
};

export type Testimonial = {
  id: string;
  author_name: string;
  rating: number;
  comment: string;
  source: string;
  review_date: string | null;
  is_active: boolean;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: Lead;
        Insert: {
          id?: string;
          name: string;
          phone: string;
          email?: string | null;
          message?: string | null;
          source?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [];
      };
      testimonials: {
        Row: Testimonial;
        Insert: {
          id?: string;
          author_name: string;
          rating: number;
          comment: string;
          source?: string;
          review_date?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Insert"]>;
        Relationships: [];
      };
    };
  };
};
