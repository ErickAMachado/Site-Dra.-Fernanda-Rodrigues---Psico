import { NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/supabaseClient";
import { leadSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Dados inválidos." },
        { status: 400 },
      );
    }

    const supabase = createSupabaseClient();

    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase não configurado." },
        { status: 500 },
      );
    }

    const { name, phone, email, message } = parsed.data;

    const { error } = await supabase.from("leads").insert({
      name,
      phone,
      email: email || null,
      message: message || null,
      source: "site",
    });

    if (error) {
      return NextResponse.json(
        { error: "Não foi possível salvar seu contato." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar a solicitação." },
      { status: 500 },
    );
  }
}