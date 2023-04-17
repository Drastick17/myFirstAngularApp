import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/item';
import { ItemService } from 'src/app/services/itemService';
import { Message } from 'src/app/models/message';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/categoryService';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
})
export class FormComponent implements OnInit {
  itemForm!: FormGroup;
  categories: Category[] = [{ id: -1, name: 'No Category' }];
  message!: Message;
  id!: string;
  http = inject(HttpClient);

  constructor(
    private readonly fbuilder: FormBuilder,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? 'new';
    this.itemForm = this.onInitForm();
    this.setCategories();

    this.route.params.subscribe((params: any) => {
      if (params['id'] === 'new') {
        this.itemForm.reset();
        return;
      }

      if (this.id && this.id !== 'new') {
        this.itemService.getItem(Number(this.id)).subscribe((data: any) => {
          const { category, ...rest } = data;
          this.categoryService.getCategory(category.id).subscribe((data) => {
            this.categories = [...this.categories, data];
            this.itemForm.patchValue({ ...rest, categoryId: category.id });
          });
        });
      }
    });
  }

  setCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = [...this.categories, ...data];
    });
  }

  setMessage(data: any) {
    const id = data.id;
    if (data != null) {
      this.message = {
        status: 'OK',
        message: `Product updated #${id} ${data.title}`,
      };
      return;
    }
    this.message = {
      status: 'BAD',
      message: `An error occurred updating the product`,
    };
  }

  onInitForm(): FormGroup {
    return (this.itemForm = this.fbuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required]],
      images: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      categoryId: [null, [Validators.required]],
    }));
  }

  onSubmit(event: any) {
    const { images, ...values } = this.itemForm.value;
    let imagesArray: string[] = [];
    if (images.includes('\n')) {
      const imgs: string[] = images.split('\n');
      imagesArray = [...imgs];
    } else {
      imagesArray = [images];
    }

    if (this.id && this.id !== 'new') {
      this.itemService
        .updateItem(Number(this.id), { ...values, images: imagesArray.flat() })
        .subscribe((data) => {
          this.setMessage(data);
          setTimeout(() => {
            this.router.navigate(['/products', data.id], {
              relativeTo: this.route,
            });
          }, 700);
        });
    } else {
      this.itemService
        .createItem({ ...values, images: imagesArray.flat() })
        .subscribe((data) => {
          this.setMessage(data);
          setTimeout(() => {
            this.router.navigate(['/products', data.id], {
              relativeTo: this.route,
            });
          }, 700);
        });
    }
  }

  onChangeCategory(e: any) {
    const newValue = e.target.value;
    this.itemForm.controls?.['categoryId']?.setValue(newValue ?? null);
  }
}
