"use client";

import { Button } from "@/shared/ui/button/button";
import { Checkbox } from "@/shared/ui/checkbox/checkbox";
import { Input } from "@/shared/ui/input/input";
import { Select } from "@/shared/ui/select/select";

export default function RegistrationForm() {
  const roleOptions = [
    { value: "owner", label: "Владелец чата" },
    { value: "advertiser", label: "Рекламодатель" },
  ];

  return (
    <div className={` w-full flex`}>
      <div className="w-full   rounded-lg overflow-hidden ">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-dark ">Создать аккаунт</h2>
          </div>
          <p className="text-sm text-dark mb-6">
            Заполните информацию чтобы создать аккаунт
          </p>
          <div className="space-y-4">
            <Input id="name" label="ФИО" placeholder="Ваше ФИО" />
            <Input
              id="phone"
              type="tel"
              label="Номер телефона или почта"
              placeholder="+1 (555) 000-0000"
            />
            <Select
              id="role"
              label="Тип аккаунта"
              options={roleOptions}
              defaultValue="owner"
            />
            <Input
              id="password"
              type="password"
              label="Пароль"
              placeholder="Создайте пароль"
            />
            <Checkbox
              id="terms"
              label="Я согласен с Условиями пользования и Политикой приватности"
            />
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 ">
          <Button variant="primary" className="w-full" text="Создать аккаунт" />
        </div>
      </div>
    </div>
  );
}
